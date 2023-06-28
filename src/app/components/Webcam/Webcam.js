/*
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Webcam.style.css'


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const WebCami = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleClick = React.useCallback(() => {
        setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        );
    }, []);

    return (
        <div>
            <div className={"leftButton"} onClick={captureImage}>Take a photo</div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={handleClick}>Switch camera</button>
            {capturedImage && (
                <img src={capturedImage} alt="Captured" width="300" height="200" />
            )}
        </div>
    );
};

export default WebCami;











// import React, { useRef } from 'react';
// import Webcam from 'react-webcam';
// import html2canvas from 'html2canvas';
//
//
// const Webcami = () => {
//     const webcamRef = useRef(null);
//     const captureImage = () => {
//         const canvasRef = document.createElement('canvas');
//         canvasRef.width = webcamRef.current.video.videoWidth;
//         canvasRef.height = webcamRef.current.video.videoHeight;
//         const context = canvasRef.getContext('2d');
//         context.drawImage(
//             webcamRef.current.video,
//             0,
//             0,
//             canvasRef.width,
//             canvasRef.height
//         );
//
//         const capturedImage = canvasRef.toDataURL('image/png');
//         // Use the capturedImage data as needed (e.g., save it to state)
//     };
//     return (
//         <div>
//             <Webcam audio={false} ref={webcamRef} />
//             <button onClick={captureImage}>Capture Image</button>
//             {/!* Add capture button and other UI elements *!/}
//         </div>
//     );
// };
//
//
// export default Webcami;
*/



import React, { useState } from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function WebCami({setOpenCamera, setTakeImg}) {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState("");

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        //setImage(imageSrc);
        setTakeImg(imageSrc);
        setOpenCamera(false);
    }, [webcamRef]);

    let videoConstraints: MediaTrackConstraints = {
        facingMode: facingMode,
        width: 270,
        height: 480
    };

    const handleClick = React.useCallback(() => {
        setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        );
    }, []);

    console.log(facingMode + videoConstraints);

    return (
        <>
            <div className="webcam-container">
                <div className="webcam-img">
                  {/*  {image === "" ? (*/}
                        <Webcam
                            className="webcam"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            screenshotQuality={1}
                        />
                 {/*   ) : (
                        <img
                            src={image}
                            alt="Scan"
                            style={{ width: "500px", height: "auto" }}
                        />
                    )}*/}
                </div>
                <button onClick={handleClick}>Switch camera</button>
                <button onClick={capture}>capture</button>
            </div>
        </>
    );
}
