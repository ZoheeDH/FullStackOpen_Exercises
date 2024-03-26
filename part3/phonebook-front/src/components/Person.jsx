const PersonDetail = ({person, deletePerson}) => {
  console.log(person)
  return (
  <div>
    {person.name} {person.number} <button id={person.id} onClick={deletePerson}>delete</button>
  </div>
  )
}

const Person = ({person, filter, deletePerson}) => {
  if (filter !== '') {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      return <PersonDetail person={person} deletePerson={deletePerson}/>
    }
  } else {
    return <PersonDetail person={person} deletePerson={deletePerson}/>
  }
}

export default Person