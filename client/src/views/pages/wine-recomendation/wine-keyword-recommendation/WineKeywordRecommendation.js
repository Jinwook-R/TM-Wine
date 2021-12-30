// redux

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import WineWrapper from '../WineWrapper';
import WIneCardWrapper from '../WIneCardWrapper';
// ================================|| WineLabelImageRecommendation ||================================ //

const WineKeywordRecommendation = () => {
    return (
        <WineWrapper>
            <Grid container justifyContent="center" alignItems="center">
                <WIneCardWrapper>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <Typography color="#845EC2" gutterBottom style={{ fontSize: 30, textAlign: 'center' }}>
                                와인 키워드 추천
                            </Typography>
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </WIneCardWrapper>
            </Grid>
        </WineWrapper>
    );
};

export default WineKeywordRecommendation;