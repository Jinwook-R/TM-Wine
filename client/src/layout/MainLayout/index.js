import { Link, Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Toolbar, Typography, useMediaQuery } from '@mui/material';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ paddingBottom: 10, backgroundColor: '#FCF7FF' }}>
            <Box
                clssName="cover"
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/wine6.jpeg)`,
                    backgroundPosition: 'center',
                    paddingTop: '20%',
                    backgroundSize: 'cover',
                    position: 'relative',
                    '::before': {
                        content: `''`,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #FCF7FF 90%)'
                    }
                }}
            >
                <Typography
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 0,
                        transform: 'translate(-50%,-50%)',
                        textTransform: 'uppercase',
                        fontSize: '4vw',
                        letterSpacing: '0.4em',
                        textIndent: '0.4em',
                        whiteSpace: 'nowrap',
                        color: '#8083FF'
                    }}
                >
                    <Link to={'/free'} style={{ textDecoration: 'none' }}>
                        TM-WINE
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 0,
                        transform: 'translate(-50%,-280%)',
                        textTransform: 'uppercase',
                        fontSize: '2.1vw',
                        letterSpacing: '0.4em',
                        textIndent: '0.4em',
                        whiteSpace: 'nowrap',
                        color: 'black'
                    }}
                >
                    와인 추천 기반 주문 서비스
                </Typography>
            </Box>
            <Main theme={theme}>
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
