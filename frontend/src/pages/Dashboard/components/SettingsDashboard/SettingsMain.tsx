import { Outlet } from 'react-router-dom';
import SettingsContainer from './SettingsContainer';

const SettingsMain = () => {
    return (
        <SettingsContainer >
            <Outlet />
        </SettingsContainer>
    );
};

export default SettingsMain;