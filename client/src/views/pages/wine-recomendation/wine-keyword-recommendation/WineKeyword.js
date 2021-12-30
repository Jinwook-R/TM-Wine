import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { wineInfoByImageAction } from '../../../../store/reducers/wine';
import WineRecommendationDialog from '../WineRecommendationDialog';

// ============================|| WineLabelImage ||============================ //

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

const WineKeyword = () => {
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
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="단맛이 좋아요" />
                            <FormControlLabel control={<Checkbox />} label="탄산이 좋아요" />
                            <FormControlLabel control={<Checkbox />} label="쓴맛이 좋아요" />
                        </FormGroup>
                    </div>
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
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    style={{ padding: '12px 0', borderRadius: 5, backgroundColor: '#B0A8B9' }}
                                >
                                    <span style={{ fontSize: 18 }}>추천받기</span>
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                </Grid>
            </Grid>
            <WineRecommendationDialog />
        </>
    );
};

export default WineKeyword;
