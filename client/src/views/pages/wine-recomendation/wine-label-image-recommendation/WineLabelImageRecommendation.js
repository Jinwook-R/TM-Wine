import { useDispatch, useSelector } from 'react-redux';

// redux
import { wineInfoByImageAction } from '../../../../store/reducers/wine';

// material-ui
import { Divider, Grid, Stack, Box, Button, Typography, useMediaQuery } from '@mui/material';

// project imports
import WineLabelImage from './WineLabelImage';
import WineWrapper from '../WineWrapper';
import WIneCardWrapper from '../WIneCardWrapper';
// ================================|| WineLabelImageRecommendation ||================================ //

const WineLabelImageRecommendation = () => {
    return (
        <WineWrapper>
            <Grid container justifyContent="center" alignItems="center">
                <WIneCardWrapper>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <Typography color="#845EC2" gutterBottom style={{ fontSize: 30, textAlign: 'center' }}>
                                라벨 기반 와인 추천
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <WineLabelImage />
                        </Grid>
                    </Grid>
                </WIneCardWrapper>
            </Grid>
        </WineWrapper>
    );
};

export default WineLabelImageRecommendation;
