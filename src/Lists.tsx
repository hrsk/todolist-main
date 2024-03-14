import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Todolist } from "./Todolist"
import { AppStateType } from "./store/store"
import { addTaskActionCreator, changeTaskStatusActionCreator, changeTaskTitleActionCreator, removeTaskActionCreator } from "./tasks-reducer"
import { changeTodolistFilterActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator } from "./todolist-reducer"
import { FilterValuesType, TodolistType } from "./types"

export const Lists = () => {

    const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todo)
    const dispatch = useDispatch()

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskActionCreator(todolistId, taskId))
    }, [])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTaskActionCreator(todolistId, value))
    }, [])

    const changeTasksFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterActionCreator(todolistId, filter))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusActionCreator(todolistId, taskId, isDone))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistActionCreator(todolistId))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, value: string) => {
        dispatch(changeTaskTitleActionCreator(todolistId, taskId, value))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, value: string) => {
        dispatch(changeTodolistTitleActionCreator(todolistId, value))
    }, [])

    return (
        <div>
            {todolists.map(todolist => {
                return (
                    <Todolist key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTasksFilter={changeTasksFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle} />
                )
            })}
        </div>
    )
}