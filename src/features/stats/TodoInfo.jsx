import {memo, useContext, useMemo} from "react";
import {TaskContext} from "@/entities/todo";

const TodoInfo = (props) => {

    const {styles} = props
    const {
      tasks,
        deleteTask
    } = useContext(TaskContext);

    const total = tasks.length

    const hasTasks = total>0

    const done = useMemo(()=>{
        return tasks.filter(({isDone})=>isDone).length
    }, [tasks])



    return (
        <div className={styles.info}>
            <div className={styles.totalTasks}>Total tasks: <span>Done {done} from {total}</span></div>
            {hasTasks &&
                <button className={styles.deleteAllButton}
                        type="button"
                        onClick={deleteTask}
                >
                    Delete all
                </button>}
        </div>
    )
}
export default memo(TodoInfo);