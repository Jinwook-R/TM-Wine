import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 600 },
            maxHeight: { sm: 1200, xs: 1500 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2 } }}>{children}</Box>
    </MainCard>
);

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapper;
