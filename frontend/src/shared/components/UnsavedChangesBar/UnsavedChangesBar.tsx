import styles from "@/shared/components/UnsavedChangesBar/UnsavedChangesBar.module.css";
import { Button } from "antd";
import { useEffect, useState } from "react";

type Props = {
    redefine: () => void;
    confirm: () => void;
    visible: boolean;
};

const UnsavedChangesBar = ({redefine, confirm, visible}: Props) => {
    const [mounted, setMounted] = useState(visible);
    const [shown, setShown] = useState(visible);

    useEffect(() => {
        if(visible) {
            setMounted(true);

            return;
        };

        setShown(false);
    }, [visible]);

    useEffect(() => {

        if(!mounted)
            return;

        requestAnimationFrame(() => {
            setShown(true);
        });

    }, [mounted]);

    const handleTransitionEnd = () => {
        if(!shown)
            setMounted(false);
    };

    if(!mounted)
        return null;

    return (
        <div className={`${styles["unsaved-changes-bar"]} ${shown ? `${styles["visible"]}` : ""} `} onTransitionEnd={handleTransitionEnd}>
            <div className={`${styles["bar-message"]}`}>
                <span>Não se esqueça de salvar suas alterações!</span>
            </div>
            <div className={`${styles["bar-options"]}`}>
                <Button type={`primary`} className={`btn-default cancel-btn`} onClick={redefine} >Redefinir</Button>
                <Button type={`primary`} className={`btn-default primary-btn`} onClick={confirm} >Salvar</Button>
            </div>
        </div>
    );
};

export default UnsavedChangesBar;