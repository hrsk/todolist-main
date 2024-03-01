import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './types';

export const App = () => {

    const tasks: TaskType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false },
        { id: 4, title: 'NodeJS', isDone: false },
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks} />
        </div>
    );
}
