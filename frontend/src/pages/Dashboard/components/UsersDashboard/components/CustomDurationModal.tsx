import { Button, DatePicker, InputNumber, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import styles from "../../../Dashboard.module.css";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CustomDuration, DurationUnit } from "../types/punishment";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: (duration: CustomDuration) => void;
}

const CustomDurationModal = ({open, onClose, onConfirm}: Props) => {
    const [mode, setMode] = useState<"relative" | "specific">("relative");

    const [durationValue, setDurationValue] = useState<number>(1);
    const [durationUnit, setDurationUnit] = useState<DurationUnit>("days");
    const [specificDate, setSpecificDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        if(mode !== "relative") {
            setDurationValue(1);
            setDurationUnit("days");
        }
        if(mode !== "specific") {
            setSpecificDate(null);
        }
    }, [mode]);

    const handleConfirm = () => {
        if(mode === "relative") {
            const expiresAt = dayjs().add(durationValue, durationUnit).toDate();

            onConfirm({
                mode: "relative",
                value: durationValue,
                unit: durationUnit,
                expiresAt
            });

            onClose();

            return;
        }

        if(mode === "specific" && specificDate) {
            onConfirm({
                mode: "specific",
                expiresAt: specificDate.toDate()
            });

            onClose();
        }
    }

    return (
        <Modal title="Duração Personalizada" className="modal-default" closable open={open} onCancel={onClose} footer={null}>
            <div className={`${styles["options-modal-content"]}`}>
                <div className={`${styles["options-modal-action"]}`}>
                    <input type="radio" id="relative" name="mode" value="relative" onChange={() => setMode("relative")} checked={mode === "relative"} />
                    <label htmlFor="relative">Duração Relativa</label>
                    <input type="radio" id="specific" name="mode" value="specific" onChange={() => setMode("specific")} checked={mode === "specific"} />
                    <label htmlFor="specific">Data Específica</label>
                </div>
                <div className={`${styles["options-modal-custom-duration"]}`}>
                    <div className={`${styles["relative-duration"]}`}>
                        <InputNumber 
                            className={`field-default input-default ${mode !== "relative" ? "field-default-disabled" : ""}`} 
                            value={durationValue} 
                            onChange={(value) => setDurationValue(value ?? 1)} 
                            min={1}
                            disabled={mode !== "relative"} 
                        />
                        <Select 
                            className={`field-default select-default ${mode !== "relative" ? "field-default-disabled" : ""}`} 
                            classNames={{popup: { root: "select-default-popup"} }} 
                            value={durationUnit} 
                            onChange={(value) => setDurationUnit(value ?? "days")} 
                            options={[
                                { value: "hours", label: "Horas" }, 
                                { value: "days", label: "Dias" }, 
                                { value: "weeks", label: "Semanas" },
                                { value: "months", label: "Meses" },
                                { value: "years", label: "Anos" }
                            ]}
                            disabled={mode !== "relative"} 
                        />
                    </div>
                    <div className={`${styles["specific-duration"]}`}>
                        <DatePicker
                            className={`field-default ${mode !== "specific" ? "field-default-disabled" : ""}`} 
                            classNames={{ root: ``}}
                            showTime 
                            disabled={mode !== "specific"} 
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                            value={specificDate}
                            onChange={(value) => setSpecificDate(value)}
                            format="DD/MM/YYYY HH:mm"
                        />
                    </div>
                </div>
                <div className={`${styles["options-modal-confirmation"]}`}>
                    <Button type="primary" className="btn-default cancel-btn" onClick={onClose}>Cancelar</Button>
                    <Button type="primary" className="btn-default danger-btn" onClick={handleConfirm} disabled={mode === "relative" ? durationValue < 1 : !specificDate} >
                        Confirmar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CustomDurationModal;