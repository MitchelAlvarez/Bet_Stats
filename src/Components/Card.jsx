import { useEffect, useState } from 'react'
import style from '../CSS/Cards.css'

export function Card({ anio, idPlayer }) {
    const [season, setSeason] = useState(
        {
            games_played: 0,
            player_id: 0,
            season: 2018,
            min: '35:42',
            fgm: 0.00,
            fga: 0.00,
            fg3m: 0.00,
            fg3a: 0.00,
            ftm: 0.00,
            fta: 0.00,
            oreb: 0.00,
            dreb: 0.00,
            reb: 0.00,
            ast: 0.00,
            stl: 0.00,
            blk: 0.00,
            turnover: 0.00,
            pf: 0.00,
            pts: 0.00,
            fg_pct: 0.00,
            fg3_pct: 0.00,
            ft_pct: 0.00
        })

    const getStatsForYear = (anio, idPlayer) => {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${anio}&player_ids[]=${idPlayer}`)
            .then(response => response.json())
            .then(json => {
                setSeason(
                    {
                        games_played: json.data[0].games_played,
                        player_id: json.data[0].player_id,
                        season: json.data[0].season,
                        min: json.data[0].min,
                        fgm: json.data[0].fgm,
                        fga: json.data[0].fga,
                        fg3m: json.data[0].fg3m,
                        fg3a: json.data[0].fg3a,
                        ftm: json.data[0].ftm,
                        fta: json.data[0].fta,
                        oreb: json.data[0].oreb,
                        dreb: json.data[0].dreb,
                        reb: json.data[0].reb,
                        ast: json.data[0].ast,
                        stl: json.data[0].stl,
                        blk: json.data[0].blk,
                        turnover: json.data[0].turnover,
                        pf: json.data[0].pf,
                        pts: json.data[0].pts,
                        fg_pct: json.data[0].fg_pct,
                        fg3_pct: json.data[0].fg3_pct,
                        ft_pct: json.data[0].ft_pct
                    })
            })
    }


    useEffect(() => {
        getStatsForYear(anio, idPlayer)
    }, [anio])

    return (
        <div className='card'>


            <div className='card-anio'>{anio}</div>

            <div className='stat'>
                <p><strong>Games Played </strong>{season.games_played}</p>
                <p><strong>Min Played </strong>{season.min}</p>
                <p><strong>Free Throws Made </strong>{season.ftm}</p>
                <p><strong>Free Throws Attempted </strong>{season.fta}</p>
                <p><strong>Field Goals Made </strong>{season.fgm}</p>
                <p><strong>Field Goals Attempted </strong>{season.fga}</p>
                <p><strong>Field Goals 3 Made </strong>{season.fg3m}</p>
                <p><strong>Field Goals 3 Attempted </strong>{season.fg3a}</p>
                <p><strong>Points </strong>{season.pts}</p>
                <p><strong>Asists </strong>{season.ast}</p>
                <p><strong>Offensive Rebounds </strong>{season.oreb}</p>
                <p><strong>Defensive Rebounds </strong>{season.dreb}</p>
                <p><strong>Rebounds </strong>{season.reb}</p>
                <p><strong>Stills </strong>{season.stl}</p>
                <p><strong>Blocks </strong>{season.blk}</p>
                <p><strong>Turnovers </strong>{season.turnover}</p>
                <p><strong>Person Foul </strong>{season.pf}</p>
            </div>

        </div>


    )
}