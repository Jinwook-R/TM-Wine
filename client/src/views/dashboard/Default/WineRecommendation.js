import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: '#845EC2',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 0,
    '&>div': {
        position: 'relative',
        zIndex: 5
    }
}));

const WineRecommendation = ({ isLoading }) => {
    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Grid item sx={{ mb: 0.75 }}>
                            <Typography
                                sx={{
                                    fontSize: '2.125rem',
                                    textAlign: 'center',
                                    lineHeight: '95px'
                                }}
                            >
                                키워드 기반 와인 추천
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};

WineRecommendation.propTypes = {
    isLoading: PropTypes.bool
};

export default WineRecommendation;
