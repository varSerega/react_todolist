import {useEffect, useState} from "react";
import tasksAPi from "@/shared/api/tasks";

const TaskPage =(props) =>{
  const {params} = props;

  const TaskId = params.id;

    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(()=>{
      tasksAPi.getById(TaskId)
          .then((taskData)=>{
              setTask(taskData);
              setHasError(false);
          })
          .catch(()=>{
              setHasError(true);
          })
          .finally(()=>{
              setLoading(false);
          })
    },[])

    if(loading){
        return <div>Loading...</div>;
    }

    if(hasError){
        return <div> task not found</div>
    }

    return (
        <>
        <h1>{task.title}</h1>
            <p>{ task.isDone ? "Task done" : "Task not done"}</p>

            </>
            )
}

export default TaskPage
