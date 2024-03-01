type PropsType = {
    title: string
}

export const Button = ({ title }: PropsType) => {
    return (
        <button onClick={() => { alert(title) }}>{title}</button>
    )
}
