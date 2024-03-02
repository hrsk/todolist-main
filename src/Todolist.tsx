import { Button } from "./Button";
import { TaskType, FilterValuesType } from "./types";

export type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (value: string) => void
    removeTask: (taskId: string) => void
    changeTasksFilter: (filter: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <Button title="+" onClick={() => props.addTask('asdasdads')} />
            </div>
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button onClick={() => props.removeTask(task.id)} title="x" />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button onClick={() => { props.changeTasksFilter("All") }} title="All" />
                <Button onClick={() => { props.changeTasksFilter("Active") }} title="Active" />
                <Button onClick={() => { props.changeTasksFilter("Completed") }} title="Completed" />
            </div>
        </div>
    );
}

