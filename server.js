const PORT = 5000
//const express = require('express')
//const app=express()
import express from 'express'
import fetch from "node-fetch";
import bodyParser from "body-parser"
const app=express()
//app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//const fetch = require('node-fetch');
async function getrobots(){
    let resp=await fetch('https://60c8ed887dafc90017ffbd56.mockapi.io/robots')
    return resp.json()
}
var robots=await getrobots()
for(let i=0;i<Object.values(robots).length;i++){
    console.log(robots[i])
}
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))
app.use("/public", express.static('public'))
app.post('/api/robots/closest/',
    async (req, res) => {
        console.log(req.body)
        //console.log(JSON.parse(JSON.stringify(req.body)))
        let x=parseFloat(req.body.x);
        let y=parseFloat(req.body.y);
        //let load=res.body.load
        var min=Math.pow(10,10)
        var id=0
        var d=0
        var bat=0
        for(let i=0;i<Object.values(robots).length;i++){
            d=Math.pow(Math.pow(robots[i].x-x,2)+Math.pow(robots[i].y-y,2),0.5)
            if(d<10 && min<10){
                if(robots[i].batteryLevel>bat){
                    id=robots[i].robotId
                    bat=robots[i].batteryLevel
                    min=d
                }
            }
            else if(d<min){
                min=d
                id=robots[i].robotId
                bat=robots[i].batteryLevel
            }
            //console.log(robots[i])
        }
        res.status(200).json({"robotId": id,
            "distanceToGoal": min, //Indicates how far the robot is from the load which needs to be moved.
            "batteryLevel": bat //Indicates current battery level of the robot.});
        });
        //res.status(200).json(9)
    })