import styles from './TextInput.module.css'

interface Props {
  placeholder: string
  value: string
  onChange: (text: string) => void
}

export const TextInput = (props: Props) => (
  <input
    className={styles.textInput}
    value={props.value}
    type="text"
    placeholder={props.placeholder}
    onChange={ (e) => props.onChange(e.target.value) }
  />
)
