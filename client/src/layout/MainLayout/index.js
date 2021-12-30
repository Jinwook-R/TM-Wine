import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, Typography, useMediaQuery } from '@mui/material';
// project imports
import Header from './Header';
import { SET_MENU } from 'store/actions';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]);

    return (
        <Box>
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
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,#fff 90%)'
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
                        color: '#B39CD0'
                    }}
                >
                    TM-WINE
                </Typography>
                {/*<Header />*/}
            </Box>
            {/* <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} /> */}
            {/* main content */}
            <Main theme={theme}>
                {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
