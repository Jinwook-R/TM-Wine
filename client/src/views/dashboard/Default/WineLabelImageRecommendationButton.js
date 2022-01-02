import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    maxWidth: '500px',
    margin: '130px auto',
    cursor: 'pointer',
    backgroundColor: '#B39CD0',
    color: '#fff',
    position: 'relative',
    borderRadius: 10
}));

const WineLabelImageRecommendationButton = ({ isLoading }) => {
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
                <AnimateButton>
                    <Typography
                        sx={{
                            fontSize: '2.125rem',
                            textAlign: 'center',
                            lineHeight: '95px'
                        }}
                    >
                        라벨 기반 와인 추천
                    </Typography>
                </AnimateButton>
            </CardWrapper>
        </>
    );
};

WineLabelImageRecommendationButton.propTypes = {
    isLoading: PropTypes.bool
};

export default WineLabelImageRecommendationButton;
