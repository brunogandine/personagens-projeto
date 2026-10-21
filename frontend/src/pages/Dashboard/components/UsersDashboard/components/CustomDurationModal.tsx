import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import dayjs from "dayjs";
import { Button, DatePicker, InputNumber, Modal, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import type { Dayjs } from "dayjs";
import type { CustomDuration, DurationUnit } from "../types/punishment.types";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: (duration: CustomDuration) => void;
}

const radioOptions = [
    { label: "Duração Relativa", value: "relative" },
    { label: "Data Específica", value: "specific"}
];

const selectOptions = [
    { value: "hours", label: "Horas" }, 
    { value: "days", label: "Dias" }, 
    { value: "weeks", label: "Semanas" },
    { value: "months", label: "Meses" },
    { value: "years", label: "Anos" }
]

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
        <Modal title="Duração Personalizada" wrapClassName="modal-default" closable open={open} onCancel={onClose} footer={null}>
            <div className={`${styles["options-modal-content"]}`}>
                <Radio.Group 
                    options={radioOptions}
                    value={mode}
                    onChange={(e) =>  setMode(e.target.value)}
                    className={"radio-default"}
                />
                <div className={`${styles["options-modal-custom-duration"]}`}>
                    <div className={`${styles["input-options"]}`}>
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
                            options={selectOptions}
                            disabled={mode !== "relative"} 
                        />
                        <DatePicker
                            className={`field-default ${mode !== "specific" ? "field-default-disabled" : ""}`} 
                            classNames={{popup: { root: "picker-default-popup"} }}
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