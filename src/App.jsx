import { useCallback, useEffect, useState } from 'react'
import style from './App.css'
import { Dashboard } from './Components/Dashboard'
import { SearchResultList } from './Components/SearchResultsList'
import { SearchBar } from './Components/SearchBar'


function App() {
  const [results, setResults] = useState([])
  const [fullName, setFullName] = useState()
  const [idPlayer, setIdPlayer] = useState(0)
  return (
    <>
      <h1>Bet Stats</h1>
      <SearchBar setResults={setResults} />
      {
        results &&
        <SearchResultList results={results} setFullName={setFullName} setIdPlayer={setIdPlayer} setResults={setResults} />
      }

      <Dashboard fullName={fullName} idPlayer={idPlayer} />

    </>
  )
}

export default App
