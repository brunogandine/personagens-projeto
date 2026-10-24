import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { CreditCardTwoTone, DollarCircleTwoTone, EditFilled, FileTextOutlined, MinusCircleTwoTone, SafetyOutlined, StarTwoTone, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import type { SelectedUserPreview } from "../../../types/users.types";

type Props = {
    users: SelectedUserPreview[];
    characterManagerAction: () => void;
};

const EditUserStep = ({users, characterManagerAction}: Props) => {
    return (
        <>
            <div className={`${styles["edit-single-account-info-container"]}`}>
                <div className={`${styles["edit-single-basic-info"]}`} >
                    <div className={`${styles["edit-single-section-title"]}`}>
                        <CreditCardTwoTone style={{fontSize: "20px"}} twoToneColor={["#6396e2", "transparent"]}/>
                        <span style={{fontWeight: "bold"}}>
                            Informações da Conta
                        </span>
                    </div>
                    <div className={`${styles["edit-single-basic-info-items"]}`}>
                        <div className={`${styles["edit-single-basic-info-item"]}`}>
                            <StarTwoTone style={{fontSize: "20px"}} twoToneColor={["#6396e2", "transparent"]} />
                            <div className={`${styles["info-container"]}`}>
                                <span style={{fontSize: "10px"}}>Level da Conta</span>
                                <span style={{fontSize: "14px", fontWeight: "bold"}}>{users[0]?.level}</span>
                            </div>
                            <EditFilled style={{fontSize: "20px", cursor: "pointer"}} />
                        </div>
                        <div className={`${styles["edit-single-basic-info-item"]}`}>
                            <DollarCircleTwoTone style={{fontSize: "20px"}} twoToneColor={["#6396e2", "transparent"]} />
                            <div className={`${styles["info-container"]}`}>
                                <span style={{fontSize: "10px"}}>Dinheiro</span>
                                <span style={{fontSize: "14px", fontWeight: "bold"}}>{users[0]?.currency}</span>
                            </div>
                            <EditFilled style={{fontSize: "20px", cursor: "pointer"}} />
                        </div>
                        <div className={`${styles["edit-single-basic-info-item"]}`}>
                            <MinusCircleTwoTone style={{fontSize: "20px"}} twoToneColor={["#6396e2", "transparent"]} />
                            <div className={`${styles["info-container"]}`}>
                                <span style={{fontSize: "10px"}}>Status da Conta</span>
                                <span style={{fontSize: "14px", fontWeight: "bold"}}>{users[0]?.active ? "Ativo" : "Inativo"}</span>
                            </div>
                            <EditFilled style={{fontSize: "20px", cursor: "pointer"}} />
                        </div>
                    </div>
                </div>
                <div className={`${styles["edit-single-characters-info"]}`} >
                    <div className={`${styles["edit-single-section-title"]}`}>
                        <TeamOutlined style={{fontSize: "20px", color: "#60ecff"}}/>
                        <span style={{fontWeight: "bold"}}>
                            Personagens
                        </span>
                    </div>
                    <div className={`${styles["edit-single-characters-info-items"]}`} >
                        <div style={{gridColumn: "1"}} className={`${styles["edit-single-characters-info-item"]}`}>
                            <span style={{fontWeight: "bold"}} >Possui: <span style={{color: "#7385ff"}}>0</span></span>
                        </div>
                        <div style={{gridColumn: "2/4", justifySelf: "end"}} className={`${styles["edit-single-characters-info-item"]}`}>
                            <button onClick={characterManagerAction} ><TeamOutlined style={{fontSize: "13px"}} />Gerenciar Personagens &gt;</button>
                        </div>
                        <div style={{gridColumn: "1/4", gridRow: "2"}} className={`${styles["edit-single-characters-info-item"]}`}>
                            <span style={{fontWeight: "bold"}}>Personagens mais usados:</span>
                            <div className={`${styles["most-used"]}`}>
                                <div className={`${styles["no-items"]}`}>
                                    <UsergroupAddOutlined style={{backgroundColor: "var(--bg-default)", fontSize: "26px", borderRadius: "18px", padding: "5px"}}/>
                                    <span style={{fontSize: "12px", fontWeight: "bold"}}>Nenhum personagem usado ainda.</span>
                                </div>
                                <div className={`most-used-items`}>
                                    <div className={`item`}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles["edit-single-admin-activity-log"]}`}>
                    <div className={`${styles["edit-single-section-title"]}`}>
                        <SafetyOutlined style={{fontSize: "20px", color: "#60ecff"}}/>
                        <span style={{fontWeight: "bold"}}>
                            Log de ações Administrativas
                        </span>
                    </div>
                    <div className={`${styles["edit-single-admin-activity-log-items"]}`} >
                        <div className={`${styles["activity-log"]}`}>
                            <div className={`${styles["no-items"]}`}>
                                <FileTextOutlined style={{backgroundColor: "var(--bg-default)", fontSize: "26px", borderRadius: "18px", padding: "5px"}}/>
                                <span style={{fontSize: "12px", fontWeight: "bold"}}>Nenhuma ação aplicada ao usuário atual.</span>
                            </div>
                            <div className={`activity-items`}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUserStep;