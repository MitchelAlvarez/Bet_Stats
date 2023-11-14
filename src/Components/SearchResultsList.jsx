import { useCallback, useEffect, useState } from 'react'
import style from '../CSS/SearchResultList.css'
//import { SearchResult } from './SearchReult'

export function SearchResultList({ results, setFullName, setIdPlayer, setResults }) {
    const handleClick = (result) => {
        setFullName(result.first_name + ' ' + result.last_name)
        setIdPlayer(result.id)
        setResults([])
    }
    {
        if (results.length > 0)
            return (

                <div id='results-list_id' className="results-list">
                    {
                        results.map(result => {
                            return (
                                <div key={result.id} className="player-result"
                                    onClick={(e) => handleClick(result)}>{result.first_name + ' ' + result.last_name}</div>
                            )
                        })
                    }
                </div>
            )
    }

}