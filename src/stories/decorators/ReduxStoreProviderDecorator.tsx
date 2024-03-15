import React from 'react';
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { AppStateType } from "../../store/store";
import { tasksReducer } from '../../tasks-reducer';
import { todolistsReducer } from '../../todolist-reducer';

const rootReducer = combineReducers({
    todo: todolistsReducer,
    tasks: tasksReducer,
})

const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState: AppStateType = {
    todo: [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ],
    tasks: {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false },
            { id: v1(), title: "AS:LDKA:SLDK", isDone: false },
            { id: v1(), title: "ASDASDADS", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "React Book", isDone: true },
        ],
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}