import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Button, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: '#845EC2',
    color: '#fff',
    position: 'relative',
    height: '100%',
    borderRadius: 0
}));

const WineLabelSearch = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const onCardClick = (event) => {
        // setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <CardWrapper border={false} content={false} onClick={onCardClick}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: '2.125rem',
                                    textAlign: 'center',
                                    lineHeight: '95px'
                                }}
                            >
                                라벨 기반 와인 추천
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};

WineLabelSearch.propTypes = {
    isLoading: PropTypes.bool
};

export default WineLabelSearch;
