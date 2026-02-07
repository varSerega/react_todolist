import {TaskContextProvider} from "@/entities/todo/";
import Todo from "@/widgets/Todo";

const TasksPage =() =>{

    return (
        <>
    <TaskContextProvider>
        <Todo />
    </TaskContextProvider>
            </>)
}

export default TasksPage
