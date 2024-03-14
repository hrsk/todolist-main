import { ChangeEvent, memo, useState } from "react"

type PropsType = {
    value: string
    callback: (value: string) => void
}

export const EditableForm = memo((props: PropsType) => {

    console.log('EditableForm is called!')


    const [value, setValue] = useState(props.value)
    const [edit, setEdit] = useState<boolean>(false)

    const editMode = () => {
        setEdit(true)
    }

    const viewMode = () => {
        if (value.trim() !== '') {
            setEdit(false)
            props.callback(value.trim())
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            {
                edit
                    ? <input value={value}
                        onChange={onChangeHandler}
                        onBlur={viewMode}
                        autoFocus
                    />
                    : <span onDoubleClick={editMode}>
                        {value}
                    </span>
            }
        </>
    )
})