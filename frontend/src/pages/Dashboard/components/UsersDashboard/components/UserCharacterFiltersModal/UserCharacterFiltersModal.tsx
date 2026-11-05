import { Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import type { UserCharactersFilters } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";

type Props = {
    open: boolean;
    onClose: () => void;
    filters: UserCharactersFilters;
    setFilters: React.Dispatch<React.SetStateAction<UserCharactersFilters>>;
};

const radioOptions = [
    { label: "Ordenação", value: "sort" },
    { label: "Filtros", value: "filters"}
];

const UserCharacterFiltersModal = ({open, onClose, filters, setFilters}: Props) => {
    const [mode, setMode] = useState<"sort" | "filters">("sort");

    // useEffect(() => {
    //     if(mode !== "sort") {
    //         setDurationValue(1);
    //         setDurationUnit("days");
    //     }
    //     if(mode !== "filters") {
    //         setSpecificDate(null);
    //     }
    // }, [mode]);

    const handleClose = () => {
        setMode("sort");
        onClose();
    };

    return (
        <Modal 
            title="Filtros"
            wrapClassName={`modal-default`}
            open={open}
            onCancel={handleClose}
            width={`fit-content`}
            footer={null}
        >
            <Radio.Group 
                block
                options={radioOptions}
                value={mode}
                onChange={(e) =>  setMode(e.target.value)}
                className={"radio-default"}
                optionType="button"
            />
        </Modal>    
    );
};

export default UserCharacterFiltersModal;