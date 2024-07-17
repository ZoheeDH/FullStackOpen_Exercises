import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [allBooks, setAllBooks] = useState([])
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.allBooks)
      setBooks(result.data.allBooks)
      setGenres([...new Set(
        result.data.allBooks.flatMap(book => book.genres)
      )])
    }
  }, [result.data])

  useEffect(() => {
    if (filter) {
      setBooks(allBooks.filter(book => book.genres.includes(filter)))
    } else {
      setBooks(allBooks)
    }
  }, [filter]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      filter by genre:
      <div>
        {genres.map((genre) => <button onClick={() => setFilter(genre)} key={genre} value={genre}>{genre}</button>)}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
