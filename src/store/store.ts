import { combineReducers, createStore } from "redux"
import { tasksReducer } from "../tasks-reducer"
import { todolistsReducer } from "../todolist-reducer"
import { useDispatch } from "react-redux"

const rootReducer = combineReducers({
    todo: todolistsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof store.getState>

type ReducersType = typeof rootReducer

export type AppStateType = ReturnType<ReducersType>

export type AppDispatch = typeof store.dispatch | any

export const useAppDispatch: () => AppDispatch = useDispatch
