import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const allGenres = useQuery(ALL_GENRES)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    if (allGenres.data) {
      setGenres(allGenres.data.allGenres)
      getBooks()
    }
  }, [allGenres.data]) // eslint-disable-line

  const handleClick = (genre) => {
    setFilter(genre)
    getBooks({ variables: { genre: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      filter by genre: {filter}
      <div>
        {genres.map((genre) => <button onClick={() => handleClick(genre)} key={genre} value={genre}>{genre}</button>)}
        <button onClick={() => handleClick(null)}>all genres</button>
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
