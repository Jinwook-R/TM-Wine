import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { everyWineInfoAction } from '../../../../store/reducers/wine';
import Loadable from '../../../../ui-component/Loadable';

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

export default function TodayWineRecommendation() {
    const classes = styledImage();
    const everyWineList = useSelector((state) => state.wine.everyWineList);
    const loadEveryWineInfoDone = useSelector((state) => state.wine.loadEveryWineInfoDone);
    const dispatch = useDispatch();

    useEffect(() => {
        !loadEveryWineInfoDone && dispatch(everyWineInfoAction());
    }, []);

    return (
        <>
            <Grid item xs={12}>
                <div className="custom__img" s>
                    <p>
                        <h3 style={{ color: '#7485B5', textAlign: 'center', fontSize: 30 }}>오늘의 추천 와인</h3>
                    </p>
                    <div className={classes.root} id="img__box">
                        <img src={process.env.PUBLIC_URL + `/wines/1. MollydookerCarnivalofLove.PNG`} alt="" />
                    </div>
                </div>
            </Grid>
        </>
    );
}
