const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const StartServer = async() => {

    const app = express(); 
    app.use(cors());
    app.use(express.json());

    // app.use('/user', function(req, res){
    //   console.log("got post");
    // })

    // app.use('/content', function(req, res){
    //   console.log("got post");
    //   proxy('http://localhost:8002')
    // })
    
    app.use('/user', proxy('http://user:8001'))
    app.use('/content', proxy('http://content:8002'))


    app.listen(8000, () => {
        console.log(('gateway port running on 8000'))
    })
}

StartServer();