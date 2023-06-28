import React from "react";
import Close from '../../assets/images/Close.svg';
import Modal from 'react-modal';
import './TaskModal.css'
import {NewUploader} from "../NewUploader/NewUploader";
import Profile from "../Profile/Profile";
import Webcami from "../Webcam/Webcam";

function TaskModal(props){

    const customStyles = {
        content: {
            padding: '40px',
            maxWidth: '768px',
            width: '100%',
            height:'auto',
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
            background:'#FFFFFF',
            borderRadius:'20px',
        },
        overlay: {zIndex: 1000}
    };


    return(
        <>
            <Modal
                isOpen={props?.tasks[props?.indx] !== undefined}
                onRequestClose={()=>props?.onCloseTaskModal()}
                style={customStyles}
                ariaHideApp={false}
                // className="YouClass"
            >
                <div className={"modalInside"}>
                    <div className={"closingModal"}
                         onClick={()=>props?.onCloseTaskModal()}
                    >
                        <img className={"close"} src={Close} alt="" />
                    </div>
                    <div>
                        <div className={"modalTitle"}>{props?.tasks[props?.indx]?.taskName}</div>
                        <div className={"modalText"}>{props?.tasks[props?.indx]?.taskText}</div>
                        <div className={"buttonsDiv"}>
                            {/*<div className={"leftButton"}>Take a photo</div>*/}
                            {/*<Profile/>*/}
                            <Webcami/>
                            <NewUploader uploadImages={props.uploadImages} indx={props.indx}
                            tasks={props.tasks}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default TaskModal;