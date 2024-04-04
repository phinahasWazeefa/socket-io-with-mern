const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require("body-parser");
const cors = require('cors');


const indexRoutes = require("./routes/index");
const dbConnnection = require("./configurations/databaseConfiguration");
const {updateUserSocket,geteUserSocket} = require("./services/adminServices")

const expressApp = express();
const serverInstanceForApi = express();

const server = http.createServer(expressApp);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});


let PORT = 8081;

serverInstanceForApi.use(bodyParser.json())
serverInstanceForApi.use(cors());



//routing
serverInstanceForApi.use("/", indexRoutes);

//Handling invalid api request
serverInstanceForApi.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404 || err.status;
  res.status(err.status).send({ message: "Invalid API" });
  next();
});

//Hadeling error and sending response
serverInstanceForApi.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message;
  console.log(error);
  res.status(statusCode).json({ message });
});

io.on("connection",async  (socket) => {

  console.log("User connected");
    let userEmail = socket.handshake.query.userEmail;
   console.log("User connected with email: " + userEmail);
   await updateUserSocket(socket.id, userEmail);


  socket.on("messageFromUI",(data)=>{
    console.log("Message from UI: " + data);
    socket.emit("messageForwardToClients",{message:"Message to clients"});
  })

  socket.on("messageToBroadcast",async (data)=>{
    console.log("Message to broadcast: ",data);
    let clientId = await geteUserSocket(data.userEmail);
    console.log(clientId)
    io.to(clientId.socketId).emit("broadcastFromAdmin",{message:"This your admin speaking"});
  })

});




server.listen(PORT,()=>console.log("Socket IO Server started @8081"))

dbConnnection.dbConnection.then(() => {
  serverInstanceForApi.listen(8080, () => {
   console.log("API Server started @ 8080")
  })
})