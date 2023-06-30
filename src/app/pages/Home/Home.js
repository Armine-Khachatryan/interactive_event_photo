import React, {useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Keyboard, Pagination, Navigation} from 'swiper';
import TaskModal from "../../components/TaskModal/TaskModal";
import classes from './Home.module.css';
import config from "../../config";
import 'swiper/css';
import 'swiper/css/keyboard';
import "swiper/css/pagination";
import "swiper/css/navigation";
import FullscreenImage from '../../components/FullscreenImage/FullscreenImage';


const tasks = Array.from({length: 12}, (_, k) => (

    {
        taskName: "Task Name" + " " + (k + 1),
        taskText: "This step will help you to depict your action plan in detail, specifying actions and identifying " +
            "suitable evaluation means for your action.",
    }
))

function Home(props) {

    let [indx, setIndx] = useState(undefined);
    let [tasksArray, setTasksArray] = useState(tasks);
    let [modalInfo, setModalInfo] = useState()
    let [images, setImages] = useState('')
    let [imgActiveIndex, setImgActiveIndex] = useState(null)
    let [activeTaskIndex, setActiveTaskIndex] = useState(null)

    function openTaskModal(id) {
        setIndx(id);
        getTaskModalData(id)
    }

    function closeTaskModal() {
        setIndx(undefined)
    }

    function uploadImages(images, ind) {
        let clonedTasks = JSON.parse(JSON.stringify(tasksArray));
        clonedTasks[ind].pictures = images;
        setTasksArray(clonedTasks);
    }

    let getTaskModalData = async (id) => {
        let token = sessionStorage.getItem('token')
        try {
            let response = await axios.get(`${config.baseUrl}api/task/show/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setModalInfo(response.data.data)
        } catch (error) {
        }
    }


    const renderTasks = props?.tasksResponse?.map((item, index) => (

        <div className={classes.card} key={index}>
            <div onClick={() => {
                openTaskModal(item?.id)
            }}>
                <div className={classes.cardTitle}>{item?.event_photo_task?.task_title}</div>
                <div className={classes.cardText}>{item?.event_photo_task?.task_description}</div>
                <div className={classes.cardSubTitle}>max upload: {item?.event_photo_task?.task_max_uploads}</div>
            </div>
            {item?.media.length !== 0 &&
                <div className={classes.swiperIn}

                >
                    <Swiper
                        slidesPerView={1}
                        onSlideChange={(e) => console.log(e)}
                        onSwiper={(eventListeners) => console.log(eventListeners, 1111111111111)}
                        keyboard={{enabled: true}}
                        modules={[Keyboard, Pagination, Navigation]}
                        pagination={{
                            clickable: true
                        }}
                        navigation={true}
                        className={"max_width"}
                    >

                        {item?.media.length !== 0 && item?.media?.map((img, i) => (
                            <SwiperSlide>
                                <div className={classes.cardImg} key={i} onClick={() => {
                                    setImages(img.original_url)
                                    setActiveTaskIndex(index)
                                    setImgActiveIndex(i)
                                }}>
                                    <img
                                        src={img?.original_url}
                                        alt={""}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            }
        </div>
    ))


    return (
        <>
            {images.length ?
                <FullscreenImage
                    src={images}
                    closeClick={() => {
                        setImages('')
                        setActiveTaskIndex(null)
                        setImgActiveIndex(null)
                    }}
                    leftClick={() => {
                        if(imgActiveIndex === 0){
                            setImages(props.tasksResponse[activeTaskIndex].media[props.tasksResponse[activeTaskIndex].media.length - 1].original_url)
                            return setImgActiveIndex(props.tasksResponse[activeTaskIndex].media.length - 1)
                        }
                        setImages(props.tasksResponse[activeTaskIndex].media[imgActiveIndex -1].original_url)
                        setImgActiveIndex(imgActiveIndex -1)
                    }}
                    rightClick={() => {
                        if(imgActiveIndex === props.tasksResponse[activeTaskIndex].media.length -1){
                             setImages(props.tasksResponse[activeTaskIndex].media[0].original_url)
                            return setImgActiveIndex(0)
                        }
                        setImages(props.tasksResponse[activeTaskIndex].media[imgActiveIndex +1].original_url)
                        setImgActiveIndex(imgActiveIndex +1)
                    }}
                />
                :
                <>
                    <div className={classes.whole}>
                        <div className="container">
                            <div className={classes.title}>Hello {props?.userData?.pu_name}!</div>
                            <div className={classes.subTitle}>Your Interactive Event Photo Task Gallery</div>
                            <div className={classes.cards}>
                                {renderTasks}</div>
                        </div>
                    </div>
                    <TaskModal tasks={tasks} indx={indx} onCloseTaskModal={closeTaskModal} modalInfo={modalInfo}
                               uploadImages={uploadImages} onGetTasks={props.onGetTasks}
                    />

                </>
            }
        </>
    )
}

export default Home;
