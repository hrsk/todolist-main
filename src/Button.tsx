type PropsType = {
    title: string
    onClickCallback?: () => void
}

export const Button = ({ title, onClickCallback }: PropsType) => {
    return (
        <button onClick={onClickCallback}>{title}</button>
    )
}
