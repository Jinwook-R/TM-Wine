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
        maxWidth: '500px',
        position: 'relative',
        display: 'block',
        height: '600px',
        borderWidth: '1px',
        flexGrow: '1',
        border: '1px #7485B5 solid',
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
                        <div className={classes.root} id="img__box"></div>
                    </div>
                </Grid>
            </Grid>
            <Grid container md={12} lg={6}>
                <Grid item xs={12} style={{ margin: 'auto 0' }}>
                    <Link to="/free/wineLabel" style={{ textDecoration: 'none' }}>
                        <WineLabelImageRecommendationButton isLoading={isLoading} />
                    </Link>
                </Grid>
                <Grid item xs={12} style={{ margin: 'auto 0' }}>
                    <Link to="/free/wineKeyword" style={{ textDecoration: 'none' }}>
                        <WineKeywordRecommendationButton isLoading={isLoading} />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
