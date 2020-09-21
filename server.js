const express = require('express')
const nunjuncks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjuncks.configure("views", {
  express: server, 
  autoescape: false, 
  noCache: true
})

server.get("/", function(req, res){
    const about = {
      avatar_url: "https://avatars2.githubusercontent.com/u/9908344?s=460&u=09085799e6632e677154874a7d5225d0892a7887&v=4",
      name:  "Rogerio Azevedo",
      role:  "Instrutor - Activa Click",
      description: 'Programador full-stack, focado em trazer o melhor ensino para iniciatens em programação. Colaborador da <a href="https://www.activaclick.com.br" target="_blank">Activa Click</a>',
      links : [
          { name: "Github", url:"https://github.com/raazeved/"}, 
          { name: "Twitter", url:"https://twitter.com/RogerioAzeved75/"}, 
          { name: "Linkedin", url:"https://www.linkedin.com/in/raazeved"}
      ]
    }

  return res.render("about", {about})
})

server.get("/portfolio", function(req, res){
  return res.render("portfolio", { items: videos })
})
server.get("/video", function(req, res) {
  const id = req.query.id 

  const video = videos.find(function(video) {
        return video.id == id  
  })
  
  if (!video) { 
       return res.send("Video not found!")
  }
   return res.render("video", { item: video })
})

server.listen(5000,function(){
  console.log("server is running")

})