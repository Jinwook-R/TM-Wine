import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    width: 228,
                    height: 50,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            ></Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;