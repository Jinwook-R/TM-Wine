import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { makeStyles } from '@mui/styles';
import { lineHeight } from '@mui/system';
// ==============================|| LOGO SVG ||============================== //

const styledName = makeStyles({
    root: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'medium',
        paddingTop: 10,
        lineHeight: 2
    }
});

const LogoSection = () => {
    const classes = styledName();
    return (
        <>
            <ButtonBase disableRipple component={Link} to={config.defaultPath}>
                <Logo />
            </ButtonBase>
            <span className={classes.root}>TM-WINE</span>
        </>
    );
};

export default LogoSection;
