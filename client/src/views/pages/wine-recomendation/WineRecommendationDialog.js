import React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { LoadWineInfoDoneChange } from '../../../store/reducers/wine';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function WineRecommendationDialog() {
    const dispatch = useDispatch();
    const loadWineInfoDone = useSelector((state) => state.wine.loadWineInfoDone);
    const wineList = useSelector((state) => state.wine.wineList);
    const handleClose = () => {
        dispatch(LoadWineInfoDoneChange());
    };

    const handleWineInfo = (e) => {
        if (e.target !== e.currentTarget) return;
        console.log(e.target);
    };

    console.log('WineRecommendationDialog', wineList);

    return (
        <>
            <Dialog fullScreen open={loadWineInfoDone} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative', backgroundColor: '#845EC2' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 1, flex: 1, color: 'white' }} variant="h3" component="div">
                            추천 와인
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {wineList.map((e) => (
                        <>
                            <ListItem button>
                                <ListItemText primary={e.name} secondary="Titania" />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </Dialog>
        </>
    );
}
