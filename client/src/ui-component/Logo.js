import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
// ==============================|| LOGO SVG ||============================== //

const styledLogo = makeStyles({
    root: {
        width: '75px',
        height: '50px',
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

const Logo = () => {
    const classes = styledLogo();
    return <div className={classes.root}></div>;
};

export default Logo;
