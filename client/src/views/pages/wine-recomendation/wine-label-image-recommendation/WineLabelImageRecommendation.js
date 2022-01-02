// material-ui
import { Grid, Typography } from '@mui/material';

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
                            <Typography color="#845EC2" gutterBottom style={{ fontSize: 50, textAlign: 'center' }}>
                                라벨로 와인 추천 받기
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
