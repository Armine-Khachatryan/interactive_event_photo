import React, {useState} from "react";
import Close from '../../assets/images/Close.svg';
import Modal from 'react-modal';
import './TaskModal.css'
import {NewUploader} from "../NewUploader/NewUploader";
import Profile from "../Profile/Profile";
import Webcami from "../Webcam/Webcam";
import DeleteIcon from "../../assets/images/Close.svg";
import axios from "axios";
import config from "../../config";

function TaskModal(props) {

    const customStyles = {
        content: {
            padding: '40px',
            maxWidth: '768px',
            width: '100%',
            height: 'auto',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            borderRadius: '20px',
        },
        overlay: {zIndex: 1000}
    };
    const [openCamera, setOpenCamera] = useState(false)
    const [takeImg, setTakeImg] = useState('')
    const [upImages,setUpImages]= useState([]);

    console.log(takeImg, "takeImg")

    const removeImage = (i)=> {
        let cloneImages =JSON.parse(JSON.stringify(upImages));
        cloneImages.splice(i, 1);
        setUpImages(cloneImages);
    }

    let sendPhotos= async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('task_id', props?.indx);
        formData.append('image', upImages[0].file);
        try {

            let response = await axios.post(`${config.baseUrl}api/task/upload/image`, formData,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }});
            // console.log(response.data, "response uploadImg");
            props.onCloseTaskModal();
            props.onGetTasks()
            setUpImages(null)
        } catch (error) {
            console.log(error, "error")
        }
    }

    const convertBase64ToFile = function (image) {
        const byteString = atob(image.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([ab], {
            type: 'image/jpeg',
        });
        return newBlob;
    };

    let sendPhotosCamera =async () => {
        let token= sessionStorage.getItem('token');
        let photo =takeImg;
        let newImg= convertBase64ToFile(photo)
        let formData = new FormData();
        formData.append('task_id', props?.indx);
        formData.append('image', newImg);
        try {
            let response = await axios.post(`${config.baseUrl}api/task/upload/image`, formData,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }});
            console.log(response.data, "response uploadImg");
            props.onCloseTaskModal();
            props.onGetTasks()
            setTakeImg(null)
        } catch (error) {
            console.log(error, "error")
        }
    }

    console.log(props?.modalInfo , "asasasasmoid")


    return (
        <>
            <Modal
                isOpen={props?.indx !== undefined}
                onRequestClose={() => props?.onCloseTaskModal()}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={"modalInside"}>
                    <div className={"closingModal"}
                         onClick={() => props?.onCloseTaskModal()}
                    >
                        <img className={"close"} src={Close} alt=""/>
                    </div>
                    <div>
                        <div className={"modalTitle"}>{props?.modalInfo?.event_photo_task?.task_title}</div>
                        <div className={"modalText"}>{props?.modalInfo?.event_photo_task?.task_description}</div>
                        <div className={"modalSubTitle"}>max upload:{props?.modalInfo?.event_photo_task?.task_max_uploads}</div>
                        {+props?.modalInfo?.media.length ===1 && +props?.modalInfo?.event_photo_task?.task_max_uploads === 1  ? null:
                            <div className={"buttonsDiv"}>
                                {
                                    openCamera ?
                                        <Webcami setOpenCamera={setOpenCamera} setTakeImg={setTakeImg}/>
                                        :
                                        <div className={"leftButton"} onClick={() => setOpenCamera(true)}>Take a photo</div>

                                }
                                {/*   <Profile/>*/}
                                <NewUploader uploadImages={props.uploadImages} indx={props.indx} setUpImages={setUpImages}
                                            onCloseTaskModal={props?.onCloseTaskModal} maxNumber={props?.modalInfo?.event_photo_task?.task_max_uploads}/>
                             </div>
                         }
                            {upImages  &&
                                <div className={"uploadedImagesWhole"}>
                                    <div className={"uploadedImages"}>
                                        {upImages?.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img className={"uploadedImg"}
                                                     src={image['data_url']}
                                                     alt="" width="100" />
                                                <button className={"removeItem"} onClick={() => removeImage(index)}><img className={"closeBtn"} src={DeleteIcon}/></button>
                                                {/*<div className="image-item__btn-wrapper">*/}
                                                {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                                                {/*<button className={"removeItem"} onClick={() => onImageRemove(index)}><img className={"closeBtn"} src={DeleteIcon}/></button>*/}
                                                {/*</div>*/}
                                            </div>
                                        ))}
                                    </div>
                                    {upImages?.length!==0 &&  <div className={"done"} onClick={sendPhotos}>Done</div>}
                                </div>}
                        {takeImg ?
                            <div className={"takenPhotoDiv"}>
                                <img
                                    src={takeImg}
                                    alt="Scan"
                                    style={{width: "100px", height: "auto"}}
                                />
                                <div className={"done"} onClick={sendPhotosCamera}>Done</div>
                            </div>

                            :
                            null
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default TaskModal;
