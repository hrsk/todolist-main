import { Button } from "./Button";
import { TaskType } from "./types";

export type PropsType = {
    title: string
    tasks: TaskType[]
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
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button title="All" />
                <Button title="Active" />
                <Button title="Completed" />
            </div>
        </div>
    );
}

