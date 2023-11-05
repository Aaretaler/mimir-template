import './CardManager.css'
import { TableRow } from './TableRow'
import { cardlist } from '../../data/cardlist'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { TableHeader } from '../../components/TableHeader'

export const CardManager = () => (
  <>
    <div className="cardManager">
        {/* Filter Area */}
      <TextInput placeholder='Front'/>
      <TextInput placeholder='Back'/>
      <Button title="Save" />
      <div />
      <div />
      <div>
        <input type="checkbox" id="filter" name="filter" checked />
        <label>Filter table</label>
      </div>

      {/* Table */}
      <TableHeader title='Front' sortOrder='asc'/>
      <TableHeader title='Front' sortOrder='desc'/>
      <div/>

      {cardlist.map(card => (
        <TableRow key={card.id} item={card} />
      ))}

    </div>
  </>
)
