import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTH } from "../queries"

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [updateAuthor] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      props.setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    updateAuthor({variables: {name, born: parseInt(birthYear)}})

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name:
          <select onChange={({ target }) => setName(target.value)}>
            {props.authorsList.map((author) =>
              <option key={author.id} value={author.name} >
                {author.name}
              </option>
            )}
          </select>
        </div>
        <div>
          born: <input type="number" value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type="submit" >update author</button>
      </form>
    </div>
  )
}

export default EditAuthor