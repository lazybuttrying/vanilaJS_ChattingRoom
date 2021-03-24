"use strict" //js의 오류를 최대한 잡아줌 
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

//엔터키도 전송버튼이 눌리도록 설정
chatInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send()
  }
})

function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value,

  }
  //"chatting"은 이벤트명
  socket.emit("chatting", param);
}

//클릭되면 실행될 함수를 작성 -> 작성한 내용이 전송되도록
//서버에 object형태로 전송됨
sendButton.addEventListener("click", send);

socket.emit("chatting", "from front");
//이걸 적으면 서버에서 받아주는 코드가 필요 -> app,js io.on()


//답장을 받아줄 수 있는 내용
socket.on("chatting", (data) => {
  //console.log(msg);

  // const li = document.createElement("li");
  // li.innerText = `${data.name}님이 - ${data.msg}`;
  // chatList.appendChild(li);

  //console.log(data); 서버(컴퓨터)로 갔다가 (사이트로) 넘어온 시간이 출력됨
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();

  //채팅을 날릴 때마다 가장 마지막 톡에 위치하도록 스크롤을 설정
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});
// 두 개의 브라우저가 localhost:5000으로 접속한 뒤
// 한 쪽 브라우저에서 작성한 내용이 다른 쪽에 li로 생성됨

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "recevied");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img class="image"
      src="https://yt3.ggpht.com/ytc/AAUvwnje0tdPIm0PnhZ505GGRxsXQfzE3y7u0jOux5mM=s88-c-k-c0x00ffffff-no-rj"
      alt="any">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);

  }
}
//서버에서 emit을 통해 프론트엔드 쪽으로 보내어 확인 가능
console.log(socket);