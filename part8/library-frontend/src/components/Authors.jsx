
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTH } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
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

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({variables: {name, born: parseInt(birthYear)}})

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name:
          <select>
            {authors.map((author) =>
              <option key={author.id} value={author.name}>
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

export default Authors
