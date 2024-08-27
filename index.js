const express =require('express');
const app =express();
const http =require('http');
const expressServer= http .createServer(app);
const {Server}=require('socket.io');
const io=new Server(expressServer);


io.on('connection',function(socket){


  socket.on('register', (name) => {
    socket.userName = name;
    socket.broadcast.emit('user-connected', name);
  })

    

    socket.on('new-user', (name) => {
      socket.broadcast.emit('user-connected', name);
  });
  socket.emit('chat_transfer', { user: 'Server', message: `Welcome to the chat, ${socket.userName || 'User'}!` });


    
    socket.on('chat' ,function(msg)
  {
    io.emit('chat_transfer',msg)
  })


  socket.on('disconnect', () => {
    if (socket.userName) {
      io.emit('user-disconnected', socket.userName);
  }

  
    
  })
    })

app.get('/',function(req,res){
   res.sendFile(__dirname+"/index.html")
  })
expressServer.listen(3000,function(){
    console.log("server run at @3000");
})