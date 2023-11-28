import { useCallback, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'
import { IconArrowLeft, IconSearch } from '@tabler/icons-react';
import style from '../CSS/SearchBar.css'

export function SearchBar({ setResults }) {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        const url = 'https://www.balldontlie.io/api/v1/players?search=' + value
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const result = json.data.filter((player) => {
                    const fullname = player.first_name.toLowerCase() + ' ' + player.last_name.toLowerCase()
                    return value &&
                        /*((player && player.first_name.toLowerCase().includes(value.toLowerCase())) ||
                            (player && player.last_name.toLowerCase().includes(value.toLowerCase())))*/
                        (fullname.includes(value.toLowerCase()))
                })
                setResults(result)
            })
    }


    const debouncePlayer = useCallback(debounce(value => {
        fetchData(value)
    }, 500), [])

    const handleChange = (value) => {
        setInput(value)
        debouncePlayer(value)
    }

    return (
        <div className='search-bar'>
            <IconSearch className='search-icon' />
            <input
                id='playerDrawdown'
                name='playerDropdown'
                placeholder='Text a name ex: lebron, kyrie, love...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )


}