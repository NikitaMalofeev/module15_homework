const echoUrl = 'wss://echo.websocket.events'

const btnSend = document.querySelector(".interface__button-send")
const btnGeolocation = document.querySelector(".interface__button-geolocation")
const output = document.querySelector(".chat-area")
const input = document.querySelector(".input")

let websocket;

const pushMessage = (message) => {
    let div = document.createElement("div")

    div.classList.add("div")
    div.innerHTML = `<p class="pre"> ${message}</p>`
    div.style.left = "250px";

    output.appendChild(div)
};

const initWebSocket = () => {
    websocket = new WebSocket (echoUrl);

    websocket.onopen = () => {
        console.log("Соединение установлено")
    }

    websocket.onerror = () => {
        console.log("Ошибка соединения")

        initWebSocket();
    }

    websocket.onclose = () => {
        console.log('Соединение прервано')

        initWebSocket()
    }

    websocket.onmessage = (event) => {
        if (event.data === 'echo.websocket.events sponsored by Lob.com') {

        } else {
            pushMessage(event.data)
        }
    }
}

initWebSocket();

btnSend.addEventListener('click', () => {
    const message = `${input.value.trim()}`;

    if (message === "" ) {
        return alert("Введите сообщение");
    }

    pushMessage(message);
    websocket.send(message);
});

// вопрос по этому моменту, как лучше было реализовать эффект нажатия на кнопку,
// через setTimeout и 2 присваивания стиля выглядит как костыль)
const onkeyEnter = (e) => {
    const message = `${input.value.trim()}`;
    let key = e.keyCode || e.which;
    
    if (key === 13) {
        btnSend.style.background = "white"
        pushMessage(message);
        websocket.send(message);
        function btnSendReset() {
            btnSend.style.background = "rgb(25, 197, 228)";
        }
        setTimeout(btnSendReset, 200)
        
    } 
}

btnGeolocation.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert("Ваш браузер не поддерживает отслеживание геолокации")
    } else {
        navigator.geolocation.getCurrentPosition(position => {
            const { coords } = position;

            let div = document.createElement("div");

            div.classList.add('div')
            div.innerHTML = `<a class="link" href="https://www.openstreetmap.org/export/embed.html?bbox=${coords.longitude}%2C${coords.latitude}&amp;layer=mapnik">Гео-локация</a>`
            
            output.appendChild(div)
        })
    }
})

document.addEventListener("keydown", onkeyEnter);

