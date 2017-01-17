import express from 'express';
import {Server} from 'http';
//这里后端因为是ES6  NODEJS版本不够高的话 要使babel-node src/server/server.js启动
//npm install -g babel-cli


var app = express();
var http = Server(app);

//configs

var rootPath = require('path').normalize(__dirname + '/../..');
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static( rootPath + '/public'));

//引入socket.io
var io = require('socket.io')(http);
//监听连接事件
/*io.on('connection',(socket) => {
      console.log('a new connection !!!!!!!!!!!!!!');
      socket.on('disconnect',()=>{
            console.log('user disconnect!!!!!!!');
      });
})
*/
var io = require('socket.io')(http);
import {makeStore} from "./store";
import listenWebSocket from "./io.js";

const store = makeStore();
listenWebSocket( io, store );


app.get('/',(req,res) => {
    res.render('index');
})


http.listen(2000,()=>{
      console.log('listen in 2000 port');
});