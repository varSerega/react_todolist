
const useTasksLocalStorage = () => {
    const saveTasks = localStorage.getItem('tasks')

    const savedTasks = (tasks) => {
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }

    return{
        savedTasks,
        saveTasks: saveTasks ? JSON.parse(saveTasks) : null,
    }
}

export default useTasksLocalStorage