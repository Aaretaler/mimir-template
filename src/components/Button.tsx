import styles from './Button.module.css';

interface Props {
  title: string
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: Props) => {
  return (
    <button className={styles.button} type="button" onClick={props.clickHandler}>
      {props.title}
    </button>
  )
}
