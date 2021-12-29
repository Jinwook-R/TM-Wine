import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Box, Button, Divider, Typography, FormHelperText, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ============================|| WineLabelImage ||============================ //

const styledImage = makeStyles({
    root: {
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        height: '550px',
        borderRadius: '10px',
        borderWidth: '1px',
        borderColor: 'black',
        backgroundColor: 'orange',
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
        display: 'block',
        width: '100%',
        backgroundColor: '#673ab7',
        borderRadius: '5px',
        textAlign: 'center',
        border: 'none',
        color: 'white',
        padding: '16px 32px',
        textDecoration: 'none',
        margin: '4px 2px',
        cursor: 'pointer'
    }
});

const WineLabelImage = ({ ...others }) => {
    const classes = styledImage();
    const inputClasses = styledInput();
    const scriptedRef = useScriptRef();
    const [fileList, setFileList] = useState('');

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onLoadFile = (e) => {
        const file = e.target.files;
        console.log(file);
        setFileList(file);
    };

    useEffect(() => {
        preview();
        return () => preview();
    });

    const preview = () => {
        if (!fileList) return false;

        const imgEl = document.getElementById('img__box');
        const newImgTag = document.createElement('img');

        newImgTag.src = window.URL.createObjectURL(fileList[0]);
        imgEl.appendChild(newImgTag);
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <div className="custom__img">
                        <p style={{ textAlign: 'center' }}>
                            <h3>업로드된 이미지</h3>
                        </p>
                        <div className={classes.root} id="img__box">
                            <Typography
                                variant="caption"
                                fontSize="16px"
                                textAlign={'center'}
                                style={{ margin: '0 auto', lineHeight: '30' }}
                            >
                                와인 라벨 사진을 업로드 시켜주세요:)
                            </Typography>
                        </div>
                    </div>
                    <form className="upload__input" style={{ display: 'block' }}>
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
                        {/* <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button> */}
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                {/* <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid> */}
            </Grid>
            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {/* <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl> */}

                        {/* <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl> */}
                        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack> */}
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    style={{ height: 50, borderRadius: 5 }}
                                >
                                    검색하기
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default WineLabelImage;
