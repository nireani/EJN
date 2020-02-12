const express = require('express')
const app = express()
const path = require('path')
const request = require("request");

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))



const teamToIDs = {
    lakers: "1610612747",
    warriors: "1610612744",
    heat: "1610612748",
    suns: "1610612756"
  };

  
app.get(`/teams/:teamName`,function(req,res){
    let name = req.params.teamName
    let id = teamToIDs[name]
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`,function(request,response){
        let data = JSON.parse(response.body).league.standard
        let players = data.filter(p=> p.teamId==id&&p.isActive)
        let newArr = players.map(p=> {
           return{
            firstName:p.firstName,
            lastName:p.lastName,
            jersey: p.jersey,
            pos: p.pos
           }
        })
        newArr.forEach(p=> {p.img=`https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`})
        res.send(newArr)
    })
})

app.listen(3000,function(){console.log(`onAir`)}
)









//   app.get(`/teams/:teamName`, function(req, res) {
//     let name = req.params.teamName;
//     let id = teamToIDs[name];
//     request("http://data.nba.net/10s/prod/v1/2018/players.json", function(error, response) {
//       let data = JSON.parse(response.body).league.standard;
//       let players = data.filter(p => p.teamId == id && p.isActive);
//       let newArr = players.map(p => {
//         return {
//           firstName: p.firstName,
//           lastName: p.lastName,
//           jersey: p.jersey,
//           position: p.pos
//         };
//       });
//       newArr.forEach(p => {
//         p.img = `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`
//       })
//       res.send(newArr);
//     });
//   });
  
//   const port = 3000;
//   app.listen(port, function() {
//     console.log(`Running server on port ${port}`);
//   });
  