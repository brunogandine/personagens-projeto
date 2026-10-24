import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { EditActions } from "../../types/users.types";

type Props = {
    title: string;
    step: EditActions
    goBack: () => void;
}

const UserEditHeader = ({title, step, goBack}: Props) => {
    return (
        <>
            <div className={`modal-header`}>
                {step === "character_manager" && (                
                    <button className={`modal-return`} onClick={goBack} >
                        <ArrowLeftOutlined />
                    </button>
                )}
                <div className={`modal-title`}>
                    {title}
                </div>
            </div>
        </>
    )
};

export default UserEditHeader;