import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';

const styledName = makeStyles({
    root: {}
});

const LogoSection = () => {
    const classes = styledName();
    return (
        <>
            <span className={classes.root}>TM-WINE</span>
        </>
    );
};

export default LogoSection;
