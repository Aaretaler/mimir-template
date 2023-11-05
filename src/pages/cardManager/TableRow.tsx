import { Button } from '../../components/Button'
import { Card } from '../../models/Card'

interface Props {
  item: Card
}

export const TableRow = (props: Props) => {
  return (
    <>
      <div >{props.item.front}</div>
      <div>{props.item.back}</div>
      <Button title="Delete"/>
    </>
  )
}
