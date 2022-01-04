import * as React from 'react';
import Modal from '@mui/material/Modal';
import Webcam from 'react-webcam';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import AnimateButton from './extended/AnimateButton';

const WebcamComponent = () => <Webcam />;
const styledImage = makeStyles({
    video: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    }
});

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
};

function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

export default function CameraModal({ setFileList, preview, setOpenModal }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpenModal(false);
        setOpen(false);
    };
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        (e) => {
            console.log(e.target);
            if (e.currentTarget != e.target) {
                alert('!');
            }
            const imageSrc = webcamRef.current.getScreenshot();
            const file = dataURLtoFile(imageSrc, 'a.jpeg');
            setFileList([file]);
            setOpenModal(false);
        },
        [webcamRef]
    );
    return (
        <div>
            <Modal open={true} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <>
                    <Webcam
                        style={{ display: 'block', transform: 'translate(135%, 40%)' }}
                        audio={false}
                        height="inherit"
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={500}
                    />
                    <Button
                        style={{ backgroundColor: '#8195CF', color: 'white', display: 'block', transform: 'translate(790%, 450%)' }}
                        onClick={capture}
                    >
                        Capture photo
                    </Button>
                </>
            </Modal>
        </div>
    );
}
