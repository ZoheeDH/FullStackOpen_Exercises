import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [recommended, setRecommended] = useState([])
  const [favGenre, setFavGenre] = useState('')

  useEffect(() => {
    if (result.data && props.fav) {
      const allBooks = result.data.allBooks
      setFavGenre(props.fav.favouriteGenre)
      setRecommended(allBooks.filter(book => book.genres.includes(favGenre)))
    }
  },[result.data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <strong>{favGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.map((b) => (
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

export default Recommend