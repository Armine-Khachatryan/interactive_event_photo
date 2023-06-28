import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Webcam.style.css'

const WebCami = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    return (
        <div>
            <div className={"leftButton"} onClick={captureImage}>Take a photo</div>
            {/*<button onClick={captureImage}>Capture</button>*/}
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
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
//             {/* Add capture button and other UI elements */}
//         </div>
//     );
// };
//
//
// export default Webcami;