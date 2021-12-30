import { useEffect, useState } from 'react';

// material-ui
import { Grid, List, Box } from '@mui/material';

// project imports
import WineLabelSearch from './WineLabelSearch';
import WineRecommendation from './WineRecommendation';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Box className="mainSelect" sx={{ maxWidth: 1250, margin: '0 auto' }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} lg={6} md={6}>
                    <Link to="/free/wineLabel" style={{ textDecoration: 'none' }}>
                        <WineLabelSearch isLoading={isLoading} />
                    </Link>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <Link to="/free/wineKeyword" style={{ textDecoration: 'none' }}>
                        <WineRecommendation isLoading={isLoading} />
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
