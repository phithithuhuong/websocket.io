const idName = document.getElementById("name")
const idRoom = document.getElementById("room")
const btnJoin = document.getElementById("btn_join")

const idMessage = document.getElementById("message")
const btnSend = document.getElementById("btn_send")
const ul_message = document.getElementById("ul_message");


let socket = io.connect();

socket.on("connect", function(data){
    console.log(data);
    
})

btnJoin.addEventListener("click", function(){ 
    const name = idName.value;
    const room = idRoom.value;
    socket.emit("join", room);

});
btnSend.addEventListener("click", function(){ 
   const message = idMessage.value;
   const name = idName.value;
    socket.emit("message", name +":"+ message);
    
});

socket.on("thread", function(msg){
    const li = document.createElement("li");
    li.innerText = msg;
    ul_message.appendChild(li);
})