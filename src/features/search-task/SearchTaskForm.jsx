import Field from "@/shared/ui/Field";
import {TaskContext} from "@/entities/todo";
import {useContext} from "react";

const searchTaskForm = (props)=>{

    const {styles} = props;
    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TaskContext);

    return(
        <form className={styles.form} onSubmit={(event=>event.preventDefault())}>
           <Field
               onInput={(event)=>setSearchQuery(event.target.value)}
           className="todo__field"
           label="Search Task"
           id="search-task"
           type="search"
               value={searchQuery}

           />
        </form>
    )
}

export  default  searchTaskForm