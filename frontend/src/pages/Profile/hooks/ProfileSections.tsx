import type { AuthUser } from "@/types/AuthUser";
import type { ProfileStats } from "../types/ProfileTypes";

export const ProfileSections = (user: AuthUser, stats: ProfileStats) => {
    if(!user || !stats) return [];

    return [
        {
            id: "account",
            title: "Conta",
            items: [
                {   
                    type: "user-power",
                    label: "Tipo de Usuário: ",
                    value: (
                    <span className={
                        user.user_power === "Moderator" 
                        ? "green" 
                        : user.user_power === "Admin" 
                        ? "orange" 
                        : ""
                    }>
                        {user.user_power}
                    </span>)
                }
            ]
        },
        {
            id: "characters",
            title: "Personagens",
            items: [
                {
                    type: "quantity",
                    label: "Total de Personagens: ",
                    value: <span>{stats.totalCharacters}</span>,
                },
                {
                    type: "most-played",
                    label: "Mais usado: ",
                    value: <span>{"Goku"}</span> //stats.mostPlayedCharacter.name
                }
            ]
        },
        {
            id: "combat",
            title: "Combate",
            items: [
                {
                    type: "pvp-battles",
                    label: "Batalhas PVP: ",
                    value: <span>{0}</span> //stats.pvpBattles
                },
                {
                    type: "npc-battles",
                    label: "Batalhas NPC: ",
                    value: <span>{0}</span> //stats.npcBattles
                },
                {
                    type: "completed-stories",
                    label: "Histórias Completas: ",
                    value: <span>{0}</span> //stats.completedStories
                }
            ]
        },
    ]
}