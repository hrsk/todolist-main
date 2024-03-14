import { memo } from "react";
import { useSelector } from "react-redux";
import { Task } from "./Task";
import { AppStateType } from "./store/store";
import { FilterValuesType, TaskType } from "./types";

type PropsType = {
    todolistId: string
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Tasks = memo((props: PropsType) => {

    let tasks = useSelector<AppStateType, TaskType[]>((state) => state.tasks[props.todolistId])

    let filteredTasks = tasks;
    if (props.filter === "Completed") {
        filteredTasks = tasks.filter((task) => task.isDone);
    }
    if (props.filter === "Active") {
        filteredTasks = tasks.filter((task) => !task.isDone);
    }

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    todolistId={props.todolistId}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />
            ))}
        </ul>
    );
});
