const PersonDetail = ({name, number}) => {
  return (
  <div>
    {name} {number}
  </div>
  )
}

const Person = ({person, filter}) => {
  if (filter !== '') {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      return <PersonDetail name={person.name} number={person.number} />
    }
  } else {
    return <PersonDetail name={person.name} number={person.number} />
  }
}

export default Person