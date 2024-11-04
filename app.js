let socket;
let username;

function enterChat() {
    username = document.getElementById("username").value;
    if (username) {
        document.getElementById("username-container").style.display = "none";
        document.getElementById("chat-container").style.display = "block";
        
        socket = new WebSocket('wss://chatapp-vtya.onrender.com');
        
        socket.onopen = () => console.log("Connected to WebSocket server");
        
        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            displayMessage(messageData.username, messageData.message);
        };
    }
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    if (message && socket && username) {
        socket.send(JSON.stringify({ username, message }));
        displayMessage(username, message, true);
        messageInput.value = '';
    }
}

function displayMessage(user, message, isUser = false) {
    const messageElement = document.createElement("li");
    messageElement.textContent = `${user}: ${message}`;
    if (isUser) messageElement.classList.add("user");
    document.getElementById("messages").appendChild(messageElement);
    messageElement.scrollIntoView();
}
