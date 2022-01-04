import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import WineLabelImageRecommendationButton from './WineLabelImageRecommendationButton';
import WineKeywordRecommendationButton from './WineKeywordRecommendationButton';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import TodayWineRecommendation from '../../pages/wine-recomendation/today-wine-recommendation/TodayWineRecommendation';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container sx={{ flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: 1500, margin: '0 auto' }}>
            <Grid container md={12} lg={6}>
                <TodayWineRecommendation />
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
