import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';

import { Grid } from '@mui/material'

import {SET_NOTIFICATION_COUNT} from '../../store/actions'

function Dashboard() {

  const dispatch = useDispatch();
  const [socket, setsocket] = useState(null);
  const [count,setCount] = useState(0);


  const ENDPOINT = 'http://localhost:8081';

  const socketObj = io(ENDPOINT, {
    query: {
      userEmail: 'phinahas@gmail.com'
    }
  });

  // send a "foo" event to the client
  socketObj.emit("messageFromUI",{message:"Message from UI"});

  // receive a "bar" event from the client
  socketObj.on("broadcastFromAdmin", (data) => {
   console.log(data);
  });
  
  socketObj.on("messageForwardToClients", (data) => {
    console.log(data);
   });
  

   socketObj.on("notificationFromAdmin", (data) => {

    dispatch({ type: SET_NOTIFICATION_COUNT, count:data.count });

   })

 
   const increaseCount = ()=>{
    console.log(count)
    setCount((prev) => prev + 1); // Return the incremented value
  dispatch({ type: SET_NOTIFICATION_COUNT, count: count });
   
   }

  const sentServer = ()=>{
      // send a "foo" event to the client
  socketObj.emit("bar",{message:"Hi from react UI"});
  }



  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <h3>Welcome to dashboard</h3>
          <h2 onClick={sentServer}>Click me to sent to server</h2>
          <br />
          <h3 onClick={increaseCount}>Inc</h3>

        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard