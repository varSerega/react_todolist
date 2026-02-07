import Filed from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import {useContext, useState} from "react";
import {TaskContext} from "@/entities/todo/";

const AddTaskForm = (props)=>{
const {styles} = props;
    const [newTaskTitle,setNewTaskTitle]=useState("");

    const{addTask,
        newTaskInputRef,
    } = useContext(TaskContext);

    const [error,setError]=useState('');



    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

    const onSubmit = (event)=>{
        event.preventDefault();

        if(!isNewTaskTitleEmpty){
            addTask(clearNewTaskTitle),
            ()=>setNewTaskTitle('')
        }

    }

    const onInput = (event)=> {
        const {value} = event.target;
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length ===  0;
        setNewTaskTitle(value)
        setError(hasOnlySpaces ? 'The task cannot be empty.' : '')
    }

    return (    <form className={styles.form} onSubmit={onSubmit}>
        <Filed
        className={styles.field}
        label="New TaskTitle"
        id = "new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
        />
        <Button
        type="submit"
        isDisabled={isNewTaskTitleEmpty}
        > Add
        </Button>
    </form>)
}

export default AddTaskForm;