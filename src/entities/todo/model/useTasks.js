import {useCallback, useEffect, useMemo, useRef, useState, useReducer} from "react";
import tasksAPI from "@/shared/api/tasks";

const taskReduser = (state, action)=>{
  switch(action.type){
      case 'SET_ALL':{
          return Array.isArray(action.tasks)? action.tasks : state;
      }
      case 'ADD':{
          return [...state, action.task];
      }
      case 'TOGGLE_COMPLETED':{
          const {id, isDone} = action;
          return state.map((task)=>{
              return task.id === id ? {...task, isDone} : task;
          })
      }
      case 'DELETE':{
          return state.filter((task)=>task.id!== action.id)
      }
      case 'DELETE_ALL':{
          return []
      }
      default:{
          return state;
      }
  }
}

const useTasks = ()=>{


    const [tasks, dispatch]=useReducer(taskReduser,[])

    const [searchQuery, setSearchQuery]=useState('')



    const [disappearingTaskId,setDisappearingTaskId]=useState([])

    const [appearingTaskId,setAppearingTaskId]=useState([])

    const newTaskInputRef = useRef("")



    const deleteTask= useCallback(()=>{
        const isConfirmed = confirm("все удаляем?")

        if (isConfirmed){

            tasksAPI.deleteAll(tasks)
                .then(()=> dispatch({type:'DELETE_ALL'}))
        }
    }, [tasks])



    const deleteItem= useCallback((TaskId)=>{

            tasksAPI.delete(TaskId)
                .then(()=>{
                    setDisappearingTaskId(TaskId)

                setTimeout(()=>{
                    dispatch({type: "DELETE", id:taskId})
                    setDisappearingTaskId(null)
                },400)
            })

    },[])

    const toggleTaskCompleted = useCallback((taskId, isDone)=>{

    tasksAPI.toggleCompleted(taskId, isDone).then(()=>{
            dispatch(({type:'TOGGLE_COMPLETED', id:taskId, isDone}))
        })
    }, [])


    const addTask=useCallback((title, callbackAfterAdding)=>{
            const newTask = {
                title,
                isDone:false,
            }


        tasksAPI.add(newTask)
            .then((addedTasks)=>{
            dispatch({type:"ADD", task:addedTasks})
            callbackAfterAdding();
            setSearchQuery("");
            newTaskInputRef.current.focus();
            setAppearingTaskId(addedTasks.id)
            setTimeout(()=>{
                setAppearingTaskId(null)
            },
                400)
        })



    }, [])

    useEffect(()=>{


            tasksAPI.getAll().then((serverTasks)=>dispatch({type:"SET_ALL", tasks:serverTasks}))
        newTaskInputRef.current.focus();
    },[])



    const clearSearch = searchQuery.trim().toLowerCase();
    const filteredTasks = useMemo(()=>{
        return clearSearch.length >0  ? tasks.filter(({title})=> title.toLowerCase().includes(searchQuery)) : null
    }, [searchQuery,tasks])

    return {
        tasks,
        filteredTasks,
        deleteTask,
        deleteItem,
        toggleTaskCompleted,
        setSearchQuery,
        searchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    }
}

export default useTasks;