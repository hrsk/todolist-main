import { ChangeEvent, useState, KeyboardEvent, memo } from "react"
import { Button } from "./Button"
import './App.css'

type PropsType = {
    callback: (value: string) => void
}

export const AddItemForm = memo((props: PropsType) => {

    console.log('AddItemForm is called!')

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const callbackHandler = () => {
        if (value.trim() !== '') {
            props.callback(value.trim())
            setValue('')
        } else {
            setError('Title is required!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.altKey && e.key === 'Enter') {
            callbackHandler()
        }
        if (error !== null) {
            setError(null)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'start' }}>
                <input value={value} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
                <Button title='+' onClick={callbackHandler} />
            </div>
            {
                error && <span className={error && "errorMessage"}
                    style={{ display: "block" }}>{error}</span>
            }
        </div>
    )
})