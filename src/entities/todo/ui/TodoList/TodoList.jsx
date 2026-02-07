import TodoItem from "../TodoItem/TodoItem.jsx";
import {memo, useContext} from "react";
import {TaskContext} from "@/entities/todo/model/TaskContext";

const TodoList = (props) => {

    const {styles} = props;

    const {
        tasks,
        filteredTasks,
    } = useContext(TaskContext) ;



    const hasTasks = tasks.length > 0;
    const emptyFilteredTasks = filteredTasks?.length === 0;
    if (!hasTasks) {
        return <div className={styles.emptyMessage}> There are no tasks yet</div>
    }

    if(hasTasks && emptyFilteredTasks) {
        return <div className={styles.emptyMessage}> Tasks not found</div>
    }

    return (
        <ul className={styles.list}>
        {(filteredTasks ?? tasks).map((task) =>(
            <TodoItem
                key={task.id}
             className={styles.todoItem}
                        {...task}
            />
            ))}
        </ul>
    )
}
export default memo( TodoList)