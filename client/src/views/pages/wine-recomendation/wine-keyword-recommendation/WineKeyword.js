import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Select,
    Typography
} from '@mui/material';

import { wineInfoByKeywordAction } from '../../../../store/reducers/wine';
import WineRecommendationDialog from '../WineRecommendationDialog';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// ============================|| WineKeyword ||============================ //
const WineKeyword = () => {
    const dispatch = useDispatch();
    const keywordList = useSelector((state) => state.keyword);
    const [keyword, setKeyword] = useState(0);

    const [checkboxEnable, setCheckboxEnable] = useState({
        disable: false,
        id: -1,
        idx: -1
    });
    const [checkedBox, setCheckedBox] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkboxEnable.id === -1) {
            alert('키워드를 선택하세요!');
            return false;
        }
        const keyword = String(checkboxEnable.id + 1);
        dispatch(wineInfoByKeywordAction(keyword));
    };

    const handleSelectChange = (e) => {
        setKeyword(e.target.value);
        setCheckedBox(-1);
        setCheckboxEnable({
            disable: false,
            id: -1,
            idx: -1
        });
    };

    useEffect(() => {
        setCheckedBox(checkboxEnable.id);
    }, [checkboxEnable]);

    const handleCheckBox = (e) => {
        checkboxEnable.disable
            ? setCheckboxEnable({
                  ...checkboxEnable,
                  disable: false,
                  idx: -1,
                  id: -1
              })
            : setCheckboxEnable({
                  ...checkboxEnable,
                  disable: true,
                  idx: e.target.name,
                  id: Number(e.target.id)
              });
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <FormControl sx={{ width: 300, margin: '0 auto' }}>
                    <Select id="demo-simple-select" value={keyword} onChange={handleSelectChange}>
                        <MenuItem value={0}>
                            <span style={{ fontSize: '20px' }}>상황</span>
                        </MenuItem>
                        <MenuItem value={1} sx={{ margin: '5px 0' }}>
                            <span style={{ fontSize: '20px' }}>맛</span>
                        </MenuItem>
                        <MenuItem value={2}>
                            <span style={{ fontSize: '20px' }}>궁합</span>
                        </MenuItem>
                    </Select>
                </FormControl>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="custom__img">
                        <FormGroup>
                            {keyword === 0 &&
                                keywordList.situation.list.map((keyword, idx) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={keyword[1]}
                                                name={idx}
                                                disabled={checkboxEnable.disable && checkboxEnable.idx != idx}
                                                onChange={handleCheckBox}
                                            />
                                        }
                                        label={<Typography variant={'h2'}>{keyword[0]}</Typography>}
                                    />
                                ))}
                            {keyword === 1 &&
                                keywordList.flavor.list.map((keyword, idx) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={keyword[1]}
                                                name={idx}
                                                disabled={checkboxEnable.disable && checkboxEnable.idx != idx}
                                                onChange={handleCheckBox}
                                            />
                                        }
                                        label={<Typography variant={'h2'}>{keyword[0]}</Typography>}
                                    />
                                ))}
                            {keyword === 2 &&
                                keywordList.harmony.list.map((keyword, idx) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={keyword[1]}
                                                name={idx}
                                                disabled={checkboxEnable.disable && checkboxEnable.idx != idx}
                                                onChange={handleCheckBox}
                                            />
                                        }
                                        label={<Typography variant={'h2'}>{keyword[0]}</Typography>}
                                    />
                                ))}
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
                    <form noValidate>
                        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    type="button"
                                    variant="contained"
                                    style={{ width: 300, padding: '12px 0', borderRadius: 5, backgroundColor: '#B0A8B9' }}
                                    onClick={handleSubmit}
                                >
                                    <span style={{ fontSize: 30 }}>추천받기</span>
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
