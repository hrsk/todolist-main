import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { Lists } from './Lists';
import { addTodolistActionCreator } from './todolist-reducer';


export const App = () => {

    console.log('AppWithRedux is called!')

    const dispatch = useDispatch()

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistActionCreator(value))
    }, [])

    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            <Lists />
        </div>
    )
}
