import React, {useEffect, useState} from "react";
import axios from "axios";
import { Swiper,  SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation }  from 'swiper';
import TaskModal from "../../components/TaskModal/TaskModal";
import classes from './Home.module.css';
import config from "../../config";
import 'swiper/css';
import 'swiper/css/keyboard';
import "swiper/css/pagination";
import "swiper/css/navigation";


const tasks = Array.from({length:12}, (_, k) =>(

    {
        taskName:"Task Name" + " " + (k+1),
        taskText:"This step will help you to depict your action plan in detail, specifying actions and identifying " +
            "suitable evaluation means for your action.",
    }
))

function Home(props){

    let [indx, setIndx]=useState(undefined);
    let [tasksArray, setTasksArray]=useState(tasks);
    let [modalInfo, setModalInfo]=useState()

    function openTaskModal(id) {
        setIndx(id);
        getTaskModalData(id)
    }

    function closeTaskModal() {
      setIndx(undefined)
    }

    function uploadImages(images, ind){
        let clonedTasks = JSON.parse(JSON.stringify(tasksArray));
        clonedTasks[ind].pictures=images;
        setTasksArray(clonedTasks);
    }

    let getTaskModalData =async (id) => {
        let token= sessionStorage.getItem('token')
        try {
            let response = await axios.get(`${config.baseUrl}api/task/show/${id}`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data, "modaaaal");
            setModalInfo(response.data.data)
            // setTasksResponse(response.data.data)
        } catch (error) {
            console.log(error, 'auth request  error');
            console.log(error.response, 'auth request  error response');
        }
    }



    // const renderTasks= tasks.map((item, index) =>(
    //     <div className={classes.card} key={index} onClick={()=>{openTaskModal(index)}}>
    //         <div className={classes.cardTitle}>{item.taskName}</div>
    //         <div className={classes.cardText}>{item.taskText}</div>
    //     </div>
    // ))

    // { +item?.event_photo_task?.task_max_uploads===1 && +item?.media.length ===1 setIndx(undefined)}
    // console.log(props?.tasksResponse , "sjshsdkssssssssssssssssssssssss")
    // for(let i=0; i<props?.tasksResponse.length; i++){
    //     if( +i.event_photo_task.task_max_uploads === 1 && +i.media.length ===1 ){
    //
    //     }
    // }

    const renderTasks= props?.tasksResponse?.map((item, index) =>(
        <div className={classes.card} key={index} onClick={()=>{openTaskModal( item?.id)}}>
            <div>
                <div className={classes.cardTitle}>{item?.event_photo_task?.task_title}</div>
                <div className={classes.cardText}>{item?.event_photo_task?.task_description}</div>
                <div className={classes.cardSubTitle}>max upload: {item?.event_photo_task?.task_max_uploads}</div>
            </div>
            <Swiper
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                keyboard={{ enabled: true }}
                modules={[Keyboard, Pagination, Navigation]}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                className={"max_width"}
            >
                {item?.media.length !==0 && item?.media?.map((img, index)=>(
                    <SwiperSlide>
                        <div className={classes.cardImg} key={index}>
                            <img src={img?.original_url}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    ))

    return(
        <>
            <div className={classes.whole}>
                <div className="container">
                    <div className={classes.title}>Hello {props?.userData?.pu_name}! </div>
                    <div className={classes.subTitle}>Your Interactive Event Photo Task Gallery</div>
                    <div className={classes.cards}>{renderTasks}</div>
                </div>
            </div>
            <TaskModal tasks={tasks} indx={indx} onCloseTaskModal={closeTaskModal} modalInfo={modalInfo}
                       uploadImages={uploadImages} onGetTasks={props.onGetTasks}
            />
        </>
    )
}

export default Home;