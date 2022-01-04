import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Modal, TextField, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { everyWineInfoAction, wineOrderAction } from '../../../../store/reducers/wine';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const style2 = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
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

const styledImage = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: '550px',
        position: 'relative',
        display: 'block',
        height: '600px',
        borderWidth: '1px',
        flexGrow: '1',
        border: '1px #E3E0F3 solid',
        backgroundColor: '#E3E0F3',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        '& img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            bottom: 0,
            margin: 'auto'
        },
        '& .css-1qq0zcu-MuiPaper-root-MuiDialog-paper': {
            display: 'inlineBlock'
        }
    }
});

const styledWordCloud = makeStyles({
    root: {
        margin: '0 auto',
        position: 'relative',
        display: 'block',
        height: '400px',
        borderWidth: '1px',
        flexGrow: '1',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer'
    },
    '& img': {
        marginLeft: '100px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
        bottom: 0,
        margin: 'auto'
    }
});

export default function TodayWineRecommendation() {
    const classes = styledImage();
    const wordCloud = styledWordCloud();
    const todayWine = useSelector((state) => state.wine.everyWineList);
    const loadEveryWineInfoDone = useSelector((state) => state.wine.loadEveryWineInfoDone);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [roomNumber, setRoomNumber] = useState(0);

    const [keywordModal, setKeywordModal] = useState(false);

    useEffect(() => {
        !loadEveryWineInfoDone && dispatch(everyWineInfoAction());
    }, []);

    const handleClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleButton = () => {
        setOpenModal(true);
    };

    const handleDialogClose = () => {
        setOpenModal(false);
        setKeywordModal(false);
        setRoomNumber(0);
    };

    const handleRoomNumber = (e) => {
        setRoomNumber(Number(e.target.value));
    };

    const handleOrderButton = () => {
        if (!roomNumber) {
            alert('호수를 입력하세요');
            return false;
        }
        dispatch(
            wineOrderAction({
                wineName: todayWine.name,
                roomNum: roomNumber
            })
        );
        setRoomNumber(0);
        setOpenModal(false);
    };

    const handleWordCloudButton = () => {
        setKeywordModal(true);
    };

    return (
        <>
            <Grid item xs={12}>
                <div className="custom__img" s>
                    <p>
                        <h3 style={{ color: '#7485B5', textAlign: 'center', fontSize: 30 }}>오늘의 추천 와인</h3>
                    </p>
                    <AnimateButton>
                        <Box className={classes.root} id="img__box" onClick={handleClick}>
                            {todayWine && <img src={process.env.PUBLIC_URL + `/wines/wine${todayWine.id}-1.png`} alt="" />}
                        </Box>
                    </AnimateButton>
                </div>
            </Grid>
            <BootstrapDialog open={openDialog} aria-labelledby="customized-dialog-title">
                <BootstrapDialogTitle
                    sx={{ height: '200px', fontSize: '30px', backgroundColor: '#845EC2', boxShadow: '0 1px 4px 0 #845EC2' }}
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    <h3 style={{ color: '#E3E0F3', textAlign: 'center', fontSize: 50 }}>오늘의 추천 와인</h3>
                </BootstrapDialogTitle>
                <div style={{ padding: 30 }}>
                    <Grid container className="custom__img">
                        <Grid item xs={5}>
                            <div className={classes.root} id="img__box">
                                {todayWine && <img src={process.env.PUBLIC_URL + `/wines/wine${todayWine.id}-1.png`} alt="" />}
                            </div>
                        </Grid>
                        <Grid item xs={7} style={{ marginTop: 20, paddingLeft: 10 }}>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>{todayWine?.name?.split('(')[0]}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>가격: {todayWine?.price}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>원산지: {todayWine?.origin}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>알콜 도수: {todayWine?.alcoholicity}%</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>당도: {todayWine?.sweetness}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>산도: {todayWine?.acidity}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>바디감: {todayWine?.body}</h2>
                            <h2 style={{ color: '#7485B5', textAlign: 'left', fontSize: 25 }}>타닌감: {todayWine?.tannin}</h2>
                            <Grid container style={{ justifyContent: 'left' }}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button
                                            onClick={handleButton}
                                            disableElevation
                                            fullWidth
                                            type="Button"
                                            variant="contained"
                                            style={{
                                                padding: '12px 0',
                                                borderRadius: 5,
                                                backgroundColor: '#B0A8B9',
                                                fontSize: 30
                                            }}
                                        >
                                            주문하기
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button
                                            onClick={handleWordCloudButton}
                                            disableElevation
                                            fullWidth
                                            type="Button"
                                            variant="contained"
                                            style={{
                                                marginLeft: 10,
                                                padding: '12px 0',
                                                borderRadius: 5,
                                                backgroundColor: '#B0A8B9'
                                            }}
                                        >
                                            <span style={{ fontSize: 30 }}>와인 관련 키워드 확인</span>
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: '25px' }} />
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
            <Modal
                open={keywordModal}
                onClose={handleDialogClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className={wordCloud.root} id="img__box">
                        {todayWine && <img src={process.env.PUBLIC_URL + `/review_wordcloud/wine${todayWine.id}.png`} alt="" />}
                    </div>
                </Box>
            </Modal>
        </>
    );
}
