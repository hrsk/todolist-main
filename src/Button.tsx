type PropsType = {
    title: string
    onClick?: () => void
    className?: string | undefined;
}

export const Button = ({ className, title, onClick }: PropsType) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}
