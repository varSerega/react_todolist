import {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import useTasks from "./useTasks.js";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll.js";


export const TaskContext = createContext({})

export const TaskContextProvider = (props) => {

    const { children } = props;

    const {
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
    } = useTasks()

    const{
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks);


    const value = useMemo(()=>({
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
        firstIncompleteTaskRef,
        firstIncompleteTaskId,

    }),[
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
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    ])


    return (
        <TaskContext.Provider
            value={value}
        >
            {children}
        </TaskContext.Provider>
    )
}