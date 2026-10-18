import styles from './SettingsContainer.module.css';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const SettingsContainer = ({children}: Props) => {
    return (
        <div className={`${styles["settings-main"]}`}>
            {children}
        </div>
    );
};

export default SettingsContainer;