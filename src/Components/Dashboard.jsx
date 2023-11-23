import { useEffect, useState } from 'react'
import { Card } from './Card'
import Select from 'react-select'
import teamsJson from '../JSON/teams.json'
import style from '../CSS/Dashboard.css'


export function Dashboard({ fullName, idPlayer }) {

    const [options, setOptions] = useState([])
    const [anios, setAnios] = useState([])
    const [inicio, setInicio] = useState(true)
    const [selectedOption, setSelectedOption] = useState([{ value: 0 }])
    const [playerAverageVSTeam, setPlayerAverageVSTeam] = useState([])

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
        setPlayerAverageVSTeam([])
    }, [idPlayer])

    const handleFilter = (anioOption) => {
        setAnios(getAniosArray(anioOption, false))
    }
    const teams = []
    teamsJson.map((team) => {
        teams.push({ value: team.id, label: team.full_name })
    })
    console.log(teams)

    const fetchplayerAverageVSTeam = (idPlayer, teamId) => {
        const url = `https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${idPlayer}&per_page=82`
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const result = json.data.filter((player) => player.game.home_team_id === teamId || player.game.visitor_team_id === teamId)
                setPlayerAverageVSTeam(result)
            })
    }

    useEffect(() => {
        const teamId = selectedOption.value
        if (teamId) {
            fetchplayerAverageVSTeam(idPlayer, teamId)
        }

    }, [selectedOption])
    console.log("PLAYER TEAM")
    console.log(playerAverageVSTeam)
    console.log(playerAverageVSTeam.length)
    return (
        <section className='dashboard'>
            <div className='dashboard-header'>
                <div>{fullName}</div>
                {
                    (fullName) &&
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
            {
                !inicio &&
                <div>
                    <h2>Current Season</h2>
                    <Select
                        options={teams}
                        isClearable={true}
                        placeholder='Choose a Team'
                        onChange={setSelectedOption}
                    />
                </div>


            }
            {
                (playerAverageVSTeam.length > 0) && !inicio &&
                <div className='average-for-openent-team'>
                    {
                        playerAverageVSTeam.map((game) => {
                            return (
                                <div key={game.id} className='game'>
                                    <p><strong>Free Throws Made </strong>{game.ftm}</p>
                                    <p><strong>Free Throws Attempted </strong>{game.fta}</p>
                                    <p><strong>Field Goals Made </strong>{game.fgm}</p>
                                    <p><strong>Field Goals Attempted </strong>{game.fga}</p>
                                    <p><strong>Field Goals 3 Made </strong>{game.fg3m}</p>
                                    <p><strong>Field Goals 3 Attempted </strong>{game.fg3a}</p>
                                    <p><strong>Points </strong>{game.pts}</p>
                                    <p><strong>Asists </strong>{game.ast}</p>
                                    <p><strong>Offensive Rebounds </strong>{game.oreb}</p>
                                    <p><strong>Defensive Rebounds </strong>{game.dreb}</p>
                                    <p><strong>Rebounds </strong>{game.reb}</p>
                                    <p><strong>Stills </strong>{game.stl}</p>
                                    <p><strong>Blocks </strong>{game.blk}</p>
                                    <p><strong>Turnovers </strong>{game.turnover}</p>
                                    <p><strong>Person Foul </strong>{game.pf}</p>
                                    <p><strong>Min Played </strong>{game.min}</p>
                                </div>
                            )
                        })
                    }

                </div>

            }


        </section>
    )

}