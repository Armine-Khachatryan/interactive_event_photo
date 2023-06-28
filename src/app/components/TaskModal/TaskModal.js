import React, {useState} from "react";
import Close from '../../assets/images/Close.svg';
import Modal from 'react-modal';
import './TaskModal.css'
import {NewUploader} from "../NewUploader/NewUploader";
import Profile from "../Profile/Profile";
import Webcami from "../Webcam/Webcam";

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

    return (
        <>
            <Modal
                isOpen={props?.tasks[props?.indx] !== undefined}
                onRequestClose={() => props?.onCloseTaskModal()}
                style={customStyles}
                ariaHideApp={false}
                // className="YouClass"
            >
                <div className={"modalInside"}>
                    <div className={"closingModal"}
                         onClick={() => props?.onCloseTaskModal()}
                    >
                        <img className={"close"} src={Close} alt=""/>
                    </div>
                    <div>
                        <div className={"modalTitle"}>{props?.tasks[props?.indx]?.taskName}</div>
                        <div className={"modalText"}>{props?.tasks[props?.indx]?.taskText}</div>
                        <div className={"buttonsDiv"}>
                            {
                                openCamera ?
                                    <Webcami setOpenCamera={setOpenCamera} setTakeImg={setTakeImg}/>
                                    :
                                    <div className={"leftButton"} onClick={() => setOpenCamera(true)}>Take a photo</div>

                            }
                            {/*   <Profile/>*/}
                            <NewUploader uploadImages={props.uploadImages} indx={props.indx}
                                         tasks={props.tasks}/>
                        </div>
                        {takeImg ?
                            <img
                                src={takeImg}
                                alt="Scan"
                                style={{width: "100px", height: "auto"}}
                            />
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
