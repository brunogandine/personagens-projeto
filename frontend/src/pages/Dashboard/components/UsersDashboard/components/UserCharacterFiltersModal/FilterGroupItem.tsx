import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import type { Dispatch, SetStateAction } from "react";
import type { SelectFilterItem } from "./types/filter.types";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";

type FilterProps<TValue = number | string> = {
    title: string;
} & (
    | {
        type: "select";
        addText: string;
        state: SelectFilterItem<TValue>[];
        setState: Dispatch<SetStateAction<SelectFilterItem<TValue>[]>>;
        itemOptions: {
            label: string;
            value: TValue
        }[];
    }
    | {
        type: "checkbox"
        state: TValue[];
        setState: Dispatch<SetStateAction<TValue[]>>;
        itemOptions: {
            label: string;
            value: TValue
        }[];
    }
)        

const FilterGroupItem = <TValue extends number | string,>(props: FilterProps<TValue>) => {
    const handleAddFilter = () => {
        if(props.type !== "select")
            return; 

        props.setState((prev) => [
            ...prev,
            { id: crypto.randomUUID(), value: null }
        ]);
    };

    return (
        <>
            <div className={`${styles["filter-group-title"]}`}>
                <span>{props.title}</span>
            </div>
            <div className={`${styles["filter-content-items"]} ${styles[props.type]}`}>
                {props.type === "select" && (
                    <>
                        {props.state.map((filter) => (
                            <div className={`${styles["filter-item"]}`} key={filter.id} >
                                <Select 
                                    style={{flex: "1"}}
                                    placeholder={`Selecione um anime`}
                                    options={props.itemOptions}
                                    className={`field-default select-default`}
                                    classNames={{popup: { root: "select-default-popup"}}}
                                    value={filter.value ?? undefined}
                                    onChange={(value) => {
                                        props.setState((prev) => 
                                            prev.map((item) => 
                                                item.id === filter.id
                                                ? { ...item, value }
                                                : item
                                            ))
                                    }}
                                />
                                <Button type="primary" className={`trash-can-btn-default`} onClick={() => { props.setState((prev) => prev.filter((item) => item.id !== filter.id))}} ><DeleteOutlined /></Button>
                            </div>    
                        ))}
                        <div className={`${styles["filter-item-add"]}`} onClick={handleAddFilter}>
                            <span style={{backgroundColor: "#00ccff13", borderRadius: "20px"}} >
                                <PlusOutlined style={{color: "#00f7ff", padding: "5px"}} />
                            </span>
                            <span style={{fontSize: "12px", fontWeight: "bold"}}>{props.addText}</span>
                        </div>
                    </>
                )}
                {props.type === "checkbox" && (
                    <>
                        {props.itemOptions.map((option) => (
                            <div className={`${styles["filter-item"]}`} key={option.value}>
                                <CheckboxComponent
                                    checked={props.state.includes(option.value)}
                                    onToggle={() => {
                                        props.setState((prev) =>
                                            prev.includes(option.value)
                                                ? prev.filter((value) => value !== option.value)
                                                : [...prev, option.value]
                                        );
                                    }}
                                />

                                <span>{option.label}</span>
                            </div> 
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default FilterGroupItem;