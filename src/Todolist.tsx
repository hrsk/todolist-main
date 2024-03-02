import { Button } from "./Button";
import { TaskType, FilterValuesType } from "./types";

export type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeTasksFilter: (filter: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <Button title="+" />
            </div>
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button onClickCallback={() => props.removeTask(task.id)} title="x" />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button onClickCallback={() => { props.changeTasksFilter("All") }} title="All" />
                <Button onClickCallback={() => { props.changeTasksFilter("Active") }} title="Active" />
                <Button onClickCallback={() => { props.changeTasksFilter("Completed") }} title="Completed" />
            </div>
        </div>
    );
}

