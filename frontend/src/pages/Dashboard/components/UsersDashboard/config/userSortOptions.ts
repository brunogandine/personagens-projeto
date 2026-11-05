import type { SortGroup } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";

export const sortGroups = [
    {
        key: "progression",
        label: "Progressão",
        options: [
            { label: "Nível", value: "level" },
            { label: "Ataque", value: "attack" },
            { label: "Defesa", value: "defense" },
            { label: "Saúde", value: "health" }
        ]
    },
    {
        key: "dates",
        label: "Datas",
        options: [
            { label: "Criado em", value: "createdAt"},
            { label: "Atualizado em", value: "updatedAt" },
        ]
    }
] satisfies SortGroup[];