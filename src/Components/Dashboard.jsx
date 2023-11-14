import { useEffect, useState } from 'react'
import { Card } from './Card'
import style from '../CSS/Dashboard.css'

export function Dashboard({ fullName, idPlayer }) {

    const [options, setOptions] = useState([])
    const [anios, setAnios] = useState([])
    const [inicio, setInicio] = useState(true)

    const getAniosArray = (anio, inicioCheck) => {
        console.log(anio)
        const optionsTemp = []
        for (var i = Number(anio); i <= new Date().getFullYear(); i++) {
            optionsTemp.push(i)
        }
        setInicio(inicioCheck)
        return optionsTemp
    }

    useEffect(() => {
        setOptions(getAniosArray(2018, true))
    }, [idPlayer])

    const handleFilter = (anioOption) => {
        setAnios(getAniosArray(anioOption, false))
    }
    return (
        <section className='dashboard'>
            <div className='dashboard-header'>
                <div>{fullName}</div>
                {
                    fullName &&
                    <select name="equipos" id="equiposDilter" onChange={e => handleFilter(e.target.value)}>
                        <option value="">Select Year</option>
                        {
                            options.map(option => <option key={option} value={option}>{option}</option>)
                        }
                    </select>
                }
            </div>

            <div className='cards'>
                {
                    !inicio &&
                    anios.map(anio => <Card key={anio} anio={anio} idPlayer={idPlayer} />
                    )

                }
            </div>

        </section>
    )

}