
var express = require("express")
var cors = require('cors')
var app = express()

app.use(cors())

const rondom = () =>{
    return Math.floor(Math.random() * 10000000)
}
const rating = () =>{
    return (Math.floor(Math.random() * 100)/2)/10
}

const allMovies = []
   

for(let i=0;i<500;i++){
    allMovies.push({title:`title-${i+1}`,id:rondom(),rating:rating(),desc:`desc-${i+1}`,
    releaseDate:(new Date()).getTime(),languages:["english","hindi"]})
}
app.get("/movies/:page",(req,res)=>{
    // console.log(req.params)
    let { page } = req.params
    let start = (page - 1)*12
    let end = (page)*12
    let resultset = allMovies.slice(start,end)
    res.json({data:resultset,totalRecords:allMovies.length})
})
app.get("/movie/:id",(req,res)=>{
    // console.log(req.params)
    let { id } = req.params
    let movieInfo = allMovies.find(item=>item.id == id)
    res.json(movieInfo)
})
app.get("/movie-search/:title",(req,res)=>{
    // console.log(req.params)
    let { title } = req.params
    let resultset = allMovies.filter(item=>item.title.includes(title))
    res.json({data:resultset,totalRecords:resultset.length})
})
app.listen(8080,()=>{
    console.log("server is up")
})