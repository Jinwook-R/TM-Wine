import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { LoadWineInfoDoneChange } from '../../../store/reducers/wine';
import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    },
    '& .MuiPaper-root': {
        backgroundColor: '#FCF7FF',
        maxWidth: 'none',
        width: '1250px',
        height: '950px'
    },
    '& .MuiButtonBase-root': {
        color: '#E3E0F3'
    },
    '& .MuiSvgIcon-root': {
        width: '50px',
        height: '50px'
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

const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

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
    const dispatch = useDispatch();
    const loadWineInfoDone = useSelector((state) => state.wine.loadWineInfoDone);
    const wineList = useSelector((state) => state.wine.wineList);
    const [openModal, setOpenModal] = useState(false);
    const [roomNumber, setRoomNumber] = useState('');

    const handleClose = () => {
        dispatch(LoadWineInfoDoneChange());
    };
    const classes = styledImage();

    const handleButton = (e) => {
        setOpenModal(true);
    };

    const handleDialogClose = () => {
        setOpenModal(false);
        setRoomNumber('');
    };

    const handleOrderButton = () => {
        if (!roomNumber) {
            alert('호수를 입력하세요');
            return false;
        }
        alert(`${roomNumber}호 주문이 완료되었습니다.`);
        setRoomNumber('');
        setOpenModal(false);
    };

    const handleRoomNumber = (e) => {
        setRoomNumber(e.target.value);
    };

    return (
        <div>
            <BootstrapDialog open={loadWineInfoDone} aria-labelledby="customized-dialog-title">
                <BootstrapDialogTitle
                    sx={{ height: '200px', fontSize: '30px', backgroundColor: '#845EC2', boxShadow: '0 1px 4px 0 #845EC2' }}
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    <h3 style={{ color: '#E3E0F3', textAlign: 'center', fontSize: 50 }}>추천 와인</h3>
                </BootstrapDialogTitle>
                <div style={{ padding: 30 }}>
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
                                    <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>산도: {e.acidity}</h2>
                                    <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>바디감: {e.body}</h2>
                                    <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 30 }}>타닌감: {e.tannin}</h2>
                                    <AnimateButton>
                                        <Button
                                            onClick={handleButton}
                                            disableElevation
                                            fullWidth
                                            type="Button"
                                            variant="contained"
                                            style={{ width: 350, padding: '12px 0', borderRadius: 5, backgroundColor: '#B0A8B9' }}
                                        >
                                            <span style={{ fontSize: 18 }}>주문하기</span>
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginTop: '25px' }} />
                        </>
                    ))}
                </div>
            </BootstrapDialog>
            <Modal
                open={openModal}
                onClose={handleDialogClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        투숙중인 호수를 입력하세요
                    </Typography>
                    <TextField
                        sx={{ display: 'inline-block', fontWeight: 'bold', paddingTop: '20px', textAlign: 'center' }}
                        id="standard-basic"
                        variant="standard"
                        onChange={handleRoomNumber}
                    />
                    <Button
                        onClick={handleOrderButton}
                        disableElevation
                        fullWidth
                        type="Button"
                        variant="contained"
                        style={{
                            display: 'inline-block',
                            marginLeft: '10px',
                            marginTop: '10px',
                            width: 100,
                            padding: '5px 0',
                            borderRadius: 5,
                            backgroundColor: '#B0A8B9'
                        }}
                    >
                        <span style={{ fontSize: 18 }}>완료</span>
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
