import React, {useState} from "react";
import TaskModal from "../../components/TaskModal/TaskModal";
import classes from './Home.module.css';


const tasks = Array.from({length:12}, (_, k) =>(

    {
        taskName:"Task Name" + " " + (k+1),
        taskText:"This step will help you to depict your action plan in detail, specifying actions and identifying " +
            "suitable evaluation means for your action.",
    }
))

function Home(){
    const [indx, setIndx]=useState(undefined);
    const [tasksArray, setTasksArray]=useState(tasks);

    function openTaskModal(index) {
        setIndx(index);
    }

    function closeTaskModal() {
      setIndx(undefined)
    }

    function uploadImages(images, ind){
        let clonedTasks = JSON.parse(JSON.stringify(tasksArray));
        clonedTasks[ind].pictures=images;
        setTasksArray(clonedTasks);
    }


    const renderTasks= tasks.map((item, index) =>(
        <div className={classes.card} key={index} onClick={()=>{openTaskModal(index)}}>
            <div className={classes.cardTitle}>{item.taskName}</div>
            <div className={classes.cardText}>{item.taskText}</div>
        </div>
    ))

    return(
        <>
            <div className={classes.whole}>
                <div className="container">
                    <div className={classes.title}>Hello Ann! </div>
                    <div className={classes.subTitle}>Your Interactive Event Photo Task Gallery</div>
                    <div className={classes.cards}>{renderTasks}</div>
                </div>
            </div>
            <TaskModal tasks={tasks} indx={indx} onCloseTaskModal={closeTaskModal}
                       uploadImages={uploadImages}
            />
        </>
    )
}

export default Home;