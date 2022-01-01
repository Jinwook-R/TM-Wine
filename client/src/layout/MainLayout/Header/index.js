import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

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
