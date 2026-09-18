import Card from './Card.jsx'

const TeamMembers = [
  { id: 1, name: 'Nathan', label: 'Fourth', Date: 'Sept 17th' },
  { id: 2, name: 'Angel', label: 'Fifth', Date: 'Sept 18th' },
  { id: 3, name: 'Danny', label: 'Sixth', Date: 'Sept 19th' },
]

export const NewCard = () => {
  return TeamMembers.map(({ id, label, name, Date }) => (
    <Card key={id} label={label} name={name} date={Date} />
  ))
}
