const express = require("express");
const http = require("http");
const app = express(); //express에서 실행한 내용을 app에 담음
const path = require("path") //url를 쉽게 만들어줌
//nodemon : js파일의 변경사항을 추적
const server = http.createServer(app);
const socketIO = require("socket.io");
//monent  스크롤 
const moment = require("moment");

const io = socketIO(server); //만든 서버의 내용을 io 변수에 담음


console.log(__dirname); //파일 위치의 절대 경로
app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;


io.on("connection", (socket) => {
  //console.log("successful connection");
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name: name,
      msg: msg,
      time: moment(new Date()).format("h:mm A")
    });
  })
}); //연결 성공 시 소켓에 모든 내용을 담음

server.listen(PORT, () => console.log(`server is running ${PORT}`));//포트, 실행할 명령


// npm start -> package.json의 script에서 축약어 설정 가능
// npm install -g 
//ngrok http 5000
//forwarding 옆 주소면 어디든 가능한 도메인처럼 작동