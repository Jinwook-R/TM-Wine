import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { LoadWineInfoDoneChange } from '../../../store/reducers/wine';
import { Box, Divider, Grid, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    },
    '& .MuiPaper-root': {
        maxWidth: 'none',
        width: '1250px',
        height: '950px',
        padding: 30
    }
}));

const styledImage = makeStyles({
    root: {
        marginTop: 30,
        maxWidth: '550px',
        position: 'relative',
        display: 'block',
        height: '500px',
        borderWidth: '1px',
        flexGrow: '1',
        border: '1px #E3E0F3 solid',
        backgroundColor: '#E3E0F3',
        borderRadius: '10px',
        overflow: 'hidden',
        '& img': {
            float: 'left',
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

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function WineRecommendationDialog() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const loadWineInfoDone = useSelector((state) => state.wine.loadWineInfoDone);
    const wineList = useSelector((state) => state.wine.wineList);
    const handleClose = () => {
        dispatch(LoadWineInfoDoneChange());
    };
    const classes = styledImage();
    console.log(wineList);
    return (
        <div>
            <BootstrapDialog open={loadWineInfoDone} aria-labelledby="customized-dialog-title">
                <BootstrapDialogTitle sx={{ fontSize: '30px' }} id="customized-dialog-title" onClose={handleClose}>
                    <h3 style={{ color: '#7485B5', textAlign: 'center', fontSize: 50 }}>추천 와인</h3>
                </BootstrapDialogTitle>
                {wineList.map((e) => (
                    <>
                        <Grid container className="custom__img">
                            <Grid item xs={7}>
                                <div className={classes.root} id="img__box">
                                    <img src={process.env.PUBLIC_URL + `/wines/1. MollydookerCarnivalofLove.PNG`} alt="" />
                                </div>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop: 20 }}>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>{e.name}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>가격: {e.price}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>원산지: {e.origin}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>알콜 도수: {e.alcholicity}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>당도: {e.sweetness}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>산미: {e.acidity}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>바디감: {e.body}</h2>
                                <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>타닌감: {e.tannin}</h2>
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                ))}
            </BootstrapDialog>
        </div>
    );
}
