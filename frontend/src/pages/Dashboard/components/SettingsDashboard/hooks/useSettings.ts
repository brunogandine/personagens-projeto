import { useState } from "react";
import type { MaintenanceSettingsState, SettingsState, SettingValue, GeneralFailure, SettingsFailure } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";
import type { Dispatch, SetStateAction } from "react";
import { builderMaintenanceSave, type SettingsSaveOperation } from "../builders/settings.builders";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

type ApiError = {
    type: string
    message: string,
    key: string
}

type ApiSuccess = {
    key: string
}

const initialSettings: SettingsState = {
    maintenance: {
        enabled: null,
        message: null
    }
};

const getSettingValue = (state: SettingsState, key: string): SettingValue | undefined => {
    const [group, cfg] = key.split(".");

    if(!group || !cfg)
        return undefined;

    const groupState = state[group as keyof SettingsState] as
        | Record<string, SettingValue>
        | undefined;

    if(!groupState || !Object.prototype.hasOwnProperty.call(groupState, cfg))
        return undefined;

    return groupState[cfg];
};

const setSettingValue = (state: SettingsState, key: string, value: SettingValue): SettingsState => {
    const [group, cfg] = key.split(".");

    if(!group || !cfg)
        return state;

    const groupState = state[group as keyof SettingsState] as
        | Record<string, SettingValue>
        | undefined;

    if(!groupState || !Object.prototype.hasOwnProperty.call(groupState, cfg))
        return state;

    return {
        ...state,
        [group]: {
            ...groupState,
            [cfg]: value
        }
    }
}

const buildSaveOperations = (original: SettingsState, current: SettingsState): SettingsSaveOperation[] => {
    const operations = [
        builderMaintenanceSave(original.maintenance, current.maintenance),
    ];

    return operations.filter((operation): operation is SettingsSaveOperation =>  operation !== null)
}

const useSettings = () => {
    const [originalSettings, setOriginalSettings] = useState<SettingsState>(initialSettings);
    const [settings, setSettings] = useState<SettingsState>(initialSettings);
    const [isSaving, setIsSaving] = useState(false);

    const { showToast, showMessageModal } = useMessageModal();

    const setMaintenance: Dispatch<SetStateAction<MaintenanceSettingsState>> = (value) => {
        setSettings((current) => ({
            ...current,
            maintenance: 
                typeof value === "function"
                    ? value(current.maintenance)
                    : value 
        }));
    };

    const setOriginalMaintenance: Dispatch<SetStateAction<MaintenanceSettingsState>> = (value) => {
        setOriginalSettings((current) => ({
            ...current,
            maintenance:
                typeof value === "function"
                    ? value(current.maintenance)
                    : value
        }));
    };

    const operations = buildSaveOperations(originalSettings, settings);

    const hasChanges = operations.length > 0;

    const handleCfgSuccess = (successes: ApiSuccess[], submittedSettings: SettingsState) => {
        setOriginalSettings((currentOriginal) => {
            return successes.reduce((current, success) => {
                const value = getSettingValue(submittedSettings, success.key);

                if(value === undefined)
                    return current;

                return setSettingValue(current, success.key, value)

            }, currentOriginal)
        });
    };

    const handleCfgFailure = (failures: {key: string}[], submittedSettings: SettingsState, submittedOriginal: SettingsState) => {
        setSettings((currentSettings) => {
            return failures.reduce((current, failure) => {
                const submittedValue = getSettingValue(
                    submittedSettings,
                    failure.key
                );

                const currentValue = getSettingValue(
                    current,
                    failure.key
                );

                const originalValue = getSettingValue(
                    submittedOriginal,
                    failure.key
                );

                if(submittedValue === undefined || originalValue === undefined || !Object.is(currentValue, submittedValue))
                    return current;

                return setSettingValue(
                    current,
                    failure.key,
                    originalValue
                );
            }, currentSettings)
        })
    };

    const handleReset = () => {
        setSettings(originalSettings);
    };

    const handleConfirm = async () => {
        if(isSaving)
            return;

        const submittedSettings = settings;
        const submittedOriginal = originalSettings;

        const saveOperations = buildSaveOperations(
            submittedOriginal,
            submittedSettings
        );

        if(saveOperations.length === 0)
            return;

        setIsSaving(true);

        const generalErrors: GeneralFailure[] = [];
        const settingsErrors: SettingsFailure[] = [];

        try{
            const results = await Promise.all(saveOperations.map(async (operation) => {
                try {
                    const response = await Request.patch(
                        operation.endpoint,
                        operation.payload
                    );

                    return {
                        operation,
                        response
                    };
                } catch {
                    return {
                        operation,
                        response: null
                    };
                };
            }));

            for(const result of results) {
                const res = result.response;

                if(res === null) {
                    generalErrors.push({
                        message: "Falha de conexão ao salvar uma ou mais configurações. O resultado do salvamento pode ser desconhecido."
                    });

                    continue;
                };

                if(res.ok) {
                    handleCfgSuccess(res.data.successes, submittedSettings);

                    if(res.data.errors.length > 0) {
                        settingsErrors.push(
                            ...res.data.errors.map((error: ApiError) => ({
                                key: error.key,
                                message: error.message
                            }))
                        );
                    };

                    continue;
                };

                if(res.status === 400) {
                    generalErrors.push(
                        ...res.data.errors.map((error: ApiError) => ({
                            message: error.message
                        }))
                    );

                    continue;
                };

                if(res.status === 404) {
                    generalErrors.push({
                        message: res.data.message
                    });

                    settingsErrors.push(
                        ...res.data.errors.map((error: ApiError) => ({
                            key: error.key,
                            message: error.message
                        }))
                    );
                
                    continue;
                };

                if(res.status === 500) {
                    if(res.data.successes.length > 0)
                        handleCfgSuccess(res.data.successes, submittedSettings);

                    if(res.data.errors.length > 0) {
                        settingsErrors.push(
                            ...res.data.errors.map((error: ApiError) => ({
                                key: error.key,
                                message: error.message
                            })),
                        );
                    };

                    generalErrors.push(res.data.message);

                    continue;
                };

                if(settingsErrors.length > 0) 
                    handleCfgFailure(settingsErrors.map((error) => ({ key: error.key })), submittedSettings, submittedOriginal);

                const normalizedErrors = {
                    ...generalErrors,
                    ...settingsErrors.map((error) => ({
                        message: error.message
                    }))
                };

                if(normalizedErrors.length > 0) {
                    showMessageModal({
                        data: {
                            type: "error",
                            description: normalizedErrors.length === 1 
                                ? "A configuração não foi salva."
                                : "Uma ou mais configurações não foram salvas.",
                            list: normalizedErrors,
                            instructions: "Tente novamente."
                        }
                    });

                    return;
                }

                showToast({
                    type: "success",
                    text: `Configurações salvas com sucesso.`
                });
            };
        } finally{
            setIsSaving(false);
        };
    };

    return {
        settings,
        originalSettings,
        setMaintenance,
        setOriginalMaintenance,
        isSaving,
        hasChanges,
        handleConfirm,
        handleReset
    };
};

export default useSettings;