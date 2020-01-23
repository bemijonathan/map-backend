const express = require('express');
const socket = require('socket.io');
const bodyparser = require('body-parser')
const cors = require('cors');
const app = express()
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000
const { createLink, UpdateLocation, killLink, AddNewUser, RemoveUser}  = require('./user')

const io = socket(server) 

io.on('connection', function(socket){
    console.log('a user connected');
    try {
      socket.on('updateLocation' ,({id, location, link}, callback) => {
      const response = UpdateLocation({id, location, link})
      // socket.join(link)
      io.in(link).emit('locationUpdated', {message: 'Location Updated'})
      callback(response)
    })

    socket.on('createlink', ({id, link, location}, callback) => {
      const result = createLink({id, link, location})
      callback(result)
      socket.join(link)
    })

    socket.on('newuser', ({id, link, location}, callback) => {
      let response = AddNewUser({id, link, location})
      callback(response)
      socket.join(link)
      io.in(link).emit('newuseradded', {message: 'welcome to this private network', id:'new id'})
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    } catch (error) {
      console.log(error)
    }
    
  });

server.listen(port , () => {
    console.log('ap is working now')
})


