import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';
import { borderRadius } from '@mui/system';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const WIneCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            minWidth: { xs: 1000 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            },
            border: '1px solid #9B89B3 !important',
            borderRadius: '0 !important'
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2 } }}>{children}</Box>
    </MainCard>
);

WIneCardWrapper.propTypes = {
    children: PropTypes.node
};

export default WIneCardWrapper;
