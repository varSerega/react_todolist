import styles from "./Button.module.scss"

const Button = (props)=>{
    const {
       className="",
       children,
        type="button",
        onClick,
        isDisabled,

    }=props

    return (
        <button
            className={`${styles.button} &{className}`}
            type={type}
            disabled={isDisabled}
        onClick={onClick}>
            {children}
        </button>
    )
}
export default Button