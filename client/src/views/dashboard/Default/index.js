import { useEffect, useState } from 'react';

// material-ui
import { Grid, List, Box, useMediaQuery } from '@mui/material';

// project imports
import WineLabelImageRecommendationButton from './WineLabelImageRecommendationButton';
import WineKeywordRecommendationButton from './WineKeywordRecommendationButton';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const styledImage = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: '550px',
        position: 'relative',
        display: 'block',
        height: '600px',
        borderWidth: '1px',
        flexGrow: '1',
        border: '1px #E3E0F3 solid',
        backgroundColor: '#E3E0F3',
        borderRadius: '10px',
        overflow: 'hidden',
        '& img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            bottom: 0,
            margin: 'auto'
        }
    }
});

const Dashboard = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const classes = styledImage();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container sx={{ flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: 1500, margin: '0 auto', paddingTop: '30px' }}>
            <Grid container md={12} lg={6}>
                <Grid item xs={12}>
                    <div className="custom__img">
                        <p>
                            <h3 style={{ color: '#7485B5', textAlign: 'center', fontSize: 30 }}>오늘의 추천 와인</h3>
                        </p>
                        <div className={classes.root} id="img__box">
                            <img src={process.env.PUBLIC_URL + `/wines/1.MollydookerCarnivalofLove.PNG`} alt="" />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container md={12} lg={6}>
                <div style={{ width: '100%' }}>
                    <h3 style={{ color: '#7485B5', textAlign: 'center', fontSize: 30 }}>취향에 따라 와인 추천받기</h3>
                </div>
                <Grid item xs={12} sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div
                        style={{
                            margin: '0 auto',
                            maxWidth: '550px',
                            height: '600px',
                            border: '1px #E3E0F3 solid',
                            borderRadius: '10px',
                            backgroundColor: '#E3E0F3'
                        }}
                    >
                        <div>
                            <Link to="/free/wineLabel" style={{ textDecoration: 'none' }}>
                                <WineLabelImageRecommendationButton isLoading={isLoading} />
                            </Link>
                        </div>
                        <div>
                            <Link to="/free/wineKeyword" style={{ textDecoration: 'none' }}>
                                <WineKeywordRecommendationButton isLoading={isLoading} />
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
