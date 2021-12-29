import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import WineLabelImage from '../auth-forms/WineLabelImage';
// ================================|| WineLabelImageRegister ||================================ //

const WineLabelImageRegister = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <AuthWrapper1>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <AuthCardWrapper>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item></Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography color={theme.palette.secondary.main} gutterBottom variant={'h1'}>
                                                와인 라벨로 검색
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <WineLabelImage />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default WineLabelImageRegister;
