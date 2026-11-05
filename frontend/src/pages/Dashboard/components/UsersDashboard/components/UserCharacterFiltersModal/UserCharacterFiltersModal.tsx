import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import type { UserCharactersFilters } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import { sortGroups } from "@/pages/Dashboard/components/UsersDashboard/config/userSortOptions";

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
    const [sortBy, setSortBy] = useState<UserCharactersFilters["sortBy"]>(filters.sortBy);
    const [filterBy, setFilterBy] = useState<UserCharactersFilters["filterBy"]>(filters.filterBy);

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
            <div className={`${styles["filters-content"]}`}>
                <div className={`${styles["filter-group"]}`}>
                    <Radio.Group 
                        block
                        options={radioOptions}
                        value={mode}
                        onChange={(e) =>  setMode(e.target.value)}
                        className={"radio-button-default"}
                        optionType="button"
                    />
                </div>
                {mode === "sort" && (
                    sortGroups.map((group) => (
                        <div key={group.key} className={`${styles["filter-group"]}`}>
                            <div className={`${styles["filter-group-title"]}`}>
                                <span>{group.label}</span>
                            </div>
                            <Radio.Group
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={"radio-default"}
                            >
                                {group.options.map((option) => (
                                    <Radio key={option.value} value={option.value}>
                                        {option.label}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    ))
                )}
            </div>
        </Modal>    
    );
};

export default UserCharacterFiltersModal;