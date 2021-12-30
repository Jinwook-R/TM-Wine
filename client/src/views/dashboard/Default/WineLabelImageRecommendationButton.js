import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Button, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    maxWidth: '500px',
    margin: '0 auto',
    cursor: 'pointer',
    backgroundColor: '#B39CD0',
    color: '#fff',
    position: 'relative',
    borderRadius: 10
}));

const WineLabelImageRecommendationButton = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const onCardClick = (event) => {
        // setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <CardWrapper border={false} content={false} onClick={onCardClick}>
                <Typography
                    sx={{
                        fontSize: '2.125rem',
                        textAlign: 'center',
                        lineHeight: '95px'
                    }}
                >
                    라벨 이미지 와인 추천
                </Typography>
            </CardWrapper>
        </>
    );
};

WineLabelImageRecommendationButton.propTypes = {
    isLoading: PropTypes.bool
};

export default WineLabelImageRecommendationButton;
