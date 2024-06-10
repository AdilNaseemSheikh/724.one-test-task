import styles from "./Button.module.css";

function Button({ type = "primary", children, onClick }) {
  const buttonClass = `${styles.btn} ${styles[type]}`;

  return (
    <div onClick={onClick} className={buttonClass}>
      {children}
    </div>
  );
}

export default Button;
