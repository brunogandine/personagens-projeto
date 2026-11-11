import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { Button, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { sortGroups } from "@/pages/Dashboard/components/UsersDashboard/config/userSortOptions";
import { Request } from "@/services/apiClient";
import type { UserCharactersFilters } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import type { AnimeItem } from "@/types/Animes.types";
import FilterGroupItem from "./FilterGroupItem";
import type { AnimeFilters, RarityFilters } from "./types/filter.types";
import { rarityOptions } from "../../config/userFilterOptions";

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
    const [animeFilters, setAnimeFilters] = useState<AnimeFilters[]>([]);
    const [rarityFilters, setRarityFilters] = useState<RarityFilters[]>([]);
    const [animesList, setAnimesList] = useState<AnimeItem[]>([]);

    useEffect(() => {
        getAllAnimes();
    }, []);

    const getAllAnimes = async () => {
        const res = await Request.get("/animes", {
            query: {
                deleted: "not_deleted"
            }
        });

        if(!res.ok) {
            return;
        };

        setAnimesList(res.data.data);
    };

    const handleClose = () => {
        setMode("sort");
        setSortBy(filters.sortBy);
        setFilterBy(filters.filterBy);
        setAnimeFilters([]);
        setRarityFilters([]);
        onClose();
    };

    const animeOptions = animesList.map((anime) => ({
        label: anime.name,
        value: anime.id
    }));

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
                        <div key={group.key} className={`${styles["filter-group-content"]}`}>
                            <div className={`${styles["filter-group-title"]}`}>
                                <span>{group.label}</span>
                            </div>
                            <Radio.Group
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`radio-default ${styles["sort-content-items"]}`}
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
                {mode === "filters" && (
                    <>
                        <div style={{width: "30em"}} className={`${styles["filter-group-content"]}`}>
                            <FilterGroupItem title={`Animes`} addText={`Adicionar novo anime`} type={`select`} state={animeFilters} setState={setAnimeFilters} itemOptions={animeOptions} />
                            <FilterGroupItem title={`Raridade`} type={`checkbox`} state={rarityFilters} setState={setRarityFilters} itemOptions={rarityOptions} />
                        </div>
                    </>
                )}
                <div className={`${styles["filter-modal-options"]}`}>
                    <Button type="primary" className={`btn-default cancel-btn`} onClick={handleClose}>Cancelar</Button>
                    <Button type="primary" className={`btn-default primary-btn`}>Confirmar</Button>
                </div>
            </div>
        </Modal>    
    );
};

export default UserCharacterFiltersModal;