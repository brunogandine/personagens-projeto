import { ArrowLeftOutlined } from "@ant-design/icons";
import type { EditActions } from "../../types/users.types";

type Props = {
    title: string;
    step: EditActions
    goBack: () => void;
}

const UserEditHeader = ({title, step, goBack}: Props) => {
    return (
        <div className={`modal-header`}>
            {step === "character_manager" && (                
                <button type="button" className={`modal-return`} onClick={goBack} aria-label="Voltar para edição do usuário" >
                    <ArrowLeftOutlined />
                </button>
            )}
            <div className={`modal-title`}>
                {title}
            </div>
        </div>
    )
};

export default UserEditHeader;