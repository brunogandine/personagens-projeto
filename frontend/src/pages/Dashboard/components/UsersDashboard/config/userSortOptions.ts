import type { SortGroup } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import dayjs from "dayjs";

export const sortGroups = [
    {
        key: "progression",
        label: "Progressão",
        options: [
            { label: "Nível", value: "level" },
            { label: "Ataque", value: "for_atk" },
            { label: "Defesa", value: "for_def" },
            { label: "Vida", value: "for_hp" }
        ]
    },
    {
        key: "dates",
        label: "Datas",
        options: [
            { label: "Criado em", value: "created_at"},
            { label: "Atualizado em", value: "updated_at" },
        ]
    }
] satisfies SortGroup[];

export const sortItems = {
    level: {
        label: "Nível",
        format: (value: number | Date) => value as number
    },
    for_hp: {
        label: "Vida",
        format: (value: number | Date) => value as number
    },
    for_atk: {
        label: "Ataque",
        format: (value: number | Date) => value as number
    },
    for_def: {
        label: "Defesa",
        format: (value: number | Date) => value as number
    },
    created_at: {
        label: "Criado em",
        format: (value: number | Date) => dayjs(value).format("DD/MM/YYYY")
    },
    updated_at: {
        label: "Atualizado em",
        format: (value: number | Date) => dayjs(value).format("DD/MM/YYYY")
    }
};