import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED, ME } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

// eslint-disable-next-line react-refresh/only-export-components
export const updateCache = (cache, query, addedBook) => {
  const uniqueById = (all) => {
    let books = new Set()
    return all.filter((item) => {
      let aux = item.id
      return books.has(aux) ? false : books.add(aux)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueById(allBooks.concat(addedBook))
    }
  })
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")
  const [favouriteGenre, setFavouriteGenre] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const [getUser, result] = useLazyQuery(ME)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(JSON.stringify(
        `A new book has been added: ${addedBook.title} by ${addedBook.author.name}`
      ))
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  useEffect(() => {
    if (result.data) {
      setFavouriteGenre(result.data.me)
    }
  }, [result])//eslint-disable-line
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    client.clearStore()
    localStorage.clear()
    setPage("authors")
  }

  const recommend = (event) => {
    event.preventDefault()
    getUser()
    setPage("recommend")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token
            ? <>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={recommend}>recommend</button>
                <button onClick={logout}>logout</button>
              </>
            : <button onClick={() => { setPage("login") }}>login</button>
        }
        
      </div>
      <Notify errorMessage={errorMessage} />

      <LoginForm show={page === "login"} setError={notify} setToken={setToken} setPage={setPage} />

      <Authors show={page === "authors"} setError={notify} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />
      
      <Recommend show={page === "recommend"} fav={favouriteGenre} />
      
    </div>
  );
};

export default App;
