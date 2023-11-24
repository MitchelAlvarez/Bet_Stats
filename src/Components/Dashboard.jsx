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
                                    <p><strong title='Free Throws Made'>FTM </strong>{game.ftm}</p>
                                    <p><strong>FTA </strong>{game.fta}</p>
                                    <p><strong>FGM </strong>{game.fgm}</p>
                                    <p><strong>FGA </strong>{game.fga}</p>
                                    <p><strong>FG3M </strong>{game.fg3m}</p>
                                    <p><strong>FG3A </strong>{game.fg3a}</p>
                                    <p><strong>PTS </strong>{game.pts}</p>
                                    <p><strong>AST </strong>{game.ast}</p>
                                    <p><strong>OREB </strong>{game.oreb}</p>
                                    <p><strong>DREB </strong>{game.dreb}</p>
                                    <p><strong>REB </strong>{game.reb}</p>
                                    <p><strong>STL </strong>{game.stl}</p>
                                    <p><strong>BLK </strong>{game.blk}</p>
                                    <p><strong>Turnovers </strong>{game.turnover}</p>
                                    <p><strong>PF </strong>{game.pf}</p>
                                    <p><strong>MIN </strong>{game.min}</p>
                                </div>
                            )
                        })
                    }

                </div>

            }


        </section>
    )

}