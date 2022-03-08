const express = require('express');

const server = express();



server.all('/', (req, res)=>{
  return res.sendFile('index.html', { root: '.' });
   res.end();

})



function keepAlive(){

   server.listen(8000, ()=>{console.log("Server is online!")});

}



module.exports = keepAlive;