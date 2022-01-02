import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Button, Divider, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { wineInfoByImageAction } from '../../../../store/reducers/wine';
import WineRecommendationDialog from '../WineRecommendationDialog';

// ============================|| WineLabelImage ||============================ //

const styledImage = makeStyles({
    root: {
        position: 'relative',
        display: 'block',
        height: '550px',
        border: '1px #fff solid',
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

const styledInput = makeStyles({
    root: {
        fontSize: 18,
        padding: '18px 0',
        display: 'block',
        width: '100%',
        marginTop: '8px',
        backgroundColor: '#B0A8B9',
        borderRadius: 5,
        textAlign: 'center',
        border: 'none',
        color: 'white',
        height: 55,
        textDecoration: 'none',
        cursor: 'pointer'
    }
});

const WineLabelImage = () => {
    const classes = styledImage();
    const inputClasses = styledInput();
    const [fileList, setFileList] = useState('');
    const dispatch = useDispatch();
    const isLoadWineInfoDone = useSelector((state) => state.wine.loadWineInfoDone);
    const onLoadFile = (e) => {
        const file = e.target.files;
        setFileList(file);
    };

    useEffect(() => {
        preview();
    });

    const preview = () => {
        if (!fileList || !fileList.length) return false;

        const imgEl = document.getElementById('img__box');
        const newImgTag = document.createElement('img');

        newImgTag.src = window.URL.createObjectURL(fileList[0]);
        imgEl.appendChild(newImgTag);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fileList || !fileList.length) return false;
        dispatch(wineInfoByImageAction(fileList[0]));
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <div className="custom__img">
                        <div className={classes.root} id="img__box">
                            <p style={{ textAlign: 'center', marginTop: 250 }}>
                                <h3 style={{ color: '#B0A8B9' }}>와인 라벨 사진을 업로드 하세요:)</h3>
                            </p>
                        </div>
                    </div>
                    <form className="upload__input" style={{ width: 350, margin: '0 auto', display: 'block' }}>
                        <label className={inputClasses.root} for="inputImage">
                            파일 업로드
                            <input type="file" id="inputImage" accept="img/*" onChange={onLoadFile} style={{ display: 'none' }} />
                        </label>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                    <form noValidate onSubmit={handleSubmit}>
                        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                            <Button
                                disableElevation
                                fullWidth
                                type="submit"
                                variant="contained"
                                style={{ width: 350, padding: '12px 0', borderRadius: 5, backgroundColor: '#B0A8B9' }}
                            >
                                <span style={{ fontSize: 18 }}>추천받기</span>
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
            <WineRecommendationDialog />
        </>
    );
};

export default WineLabelImage;
