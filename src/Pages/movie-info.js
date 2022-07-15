import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment"
import {Tooltip,Button} from 'antd'
import {ArrowLeftOutlined } from '@ant-design/icons'


function MoviePreview(){
    let { id } = useParams();
    const [movie, setMovie] = useState()
    let history = useHistory()
    useEffect(() => {
        fetch(`http://localhost:8080/movie/${id}`).then(res => res.json())
            .then(res => {
                setMovie(res)
            })
    }, [])
    if(!movie){
        return <div>loadig</div>
    }
    const handleClick = id => {
        history.push("/movies-list")
    }
    let { title,rating,releaseDate,languages } = movie
    return (
        <div className="ant-image-movie">
            <div style={{width:"50%",paddingTop:"40px"}} >
                <Tooltip title="cak">
                    <Button style={{border:"transparent", background: "transparent", color:'#fff'}} onClick={handleClick} icon={<ArrowLeftOutlined /> } />
                </Tooltip>
                <div  style={{fontSize:"20px",fontWeight:700}}>{title}</div>
                <p>Rating: {rating} / 5</p>
                <p>
                Vito Corleone was inspired by Frank Costello
                Like Carlo Gambino, Vito had a reputation for being a modest, under-the-radar figure.
                However, the Godfather character is most similar to real-life mobster Frank Costello,
                who was strategic, reasonable and known as "The Prime Minister" of the mob because of his wise counsel
                </p>
                <div>Release Date : {moment(releaseDate).format("YYYY-MM-DD")} </div>
                <div>Languages : {languages.join(",")} </div>
            </div>
        </div>
    )
}


export default MoviePreview