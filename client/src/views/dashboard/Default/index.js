import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

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
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Link to="/free/wineLabel">
                            <WineLabelSearch isLoading={isLoading} />
                        </Link>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <WineRecommendation isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
