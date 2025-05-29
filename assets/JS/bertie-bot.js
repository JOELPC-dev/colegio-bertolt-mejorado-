const initialQuestions = [
    "¿Servicio educativo?",
    "¿Horario de clases?",
    "¿Plan de estudios?",
    "¿Fecha de inicio de clases?",
    "¿Contactese con un asesor(a) que te brinde los precios de las matrículas y pensiones?"
];

const followUpQuestions = {
    "¿Horario de clases?": ["Horario de clases Inicial", "Horario de clases Primaria", "Horario de clases Secundaria"],
    "¿Plan de estudios?": ["Plan de estudios Inicial", "Plan de estudios Primaria", "Plan de estudios Secundaria"]
};

const finalAnswers = {
    "¿Servicio educativo?": `
        Brindamos una educación basada en competencias para que los estudiantes puedan desarrollar su potencial y contribuir al progreso de su comunidad.`,
    "Horario de clases Inicial": `
        <img src="src/recurss/Imagen1.png" alt="Inicial" style="width:100%; border-radius:10px;">
        Horario de nivel inicial: Lunes a Viernes `,
    "Horario de clases Primaria": `
        <img src="src/recurss/Imagen2.png" alt="Primaria" style="width:100%; border-radius:10px;">
        Horario de nivel primaria: Lunes a Viernes `,
    "Horario de clases Secundaria": `
        <img src="src/recurss/Imagen3.png" alt="Secundaria" style="width:100%; border-radius:10px;">
        Horario de nivel secundaria: Lunes a Viernes `,
    "Plan de estudios Inicial": `
        <img src="src/recurss/Imagenn1.png" alt="Inicial" style="width:100%; border-radius:10px;">`,
    "Plan de estudios Primaria": `
        <img src="src/recurss/Imagenn2.png" alt="Primaria" style="width:100%; border-radius:10px;">`,
    "Plan de estudios Secundaria": `
        <img src="src/recurss/Imagenn3.png" alt="Secundaria" style="width:100%; border-radius:10px;">`,
    "¿Deseas conocer nuestra fecha de inicio de clases?": `
        <img src="src/recurss/Imagennn1.png" alt="Inicio de clases" style="width:100%; border-radius:10px;">
        Las clases comienzan el 03 de marzo. ¡No te lo pierdas!`
};

function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex";
        displayWelcomeMessage();
    } else {
        chatContainer.style.display = "none";
    }
}

function displayWelcomeMessage() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    const welcomeMessage = document.createElement("div");
    welcomeMessage.className = "message bot-message";
    welcomeMessage.innerHTML = "¡Hola!<b> 🤖 Soy BERTIE,</b> ¿en qué puedo ayudarte hoy?";
    chatBox.appendChild(welcomeMessage);
    displayQuestionOptions(initialQuestions);
}

function displayQuestionOptions(options) {
    const chatBox = document.getElementById("chat-box");
    options.forEach((option, index) => {
        setTimeout(() => {
            const questionOption = document.createElement("div");
            questionOption.className = "question-option";
            questionOption.innerText = option;
            questionOption.onclick = () => handleQuestion(option);
            chatBox.appendChild(questionOption);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000 * index);
    });
}





let continuePromptTimer; // Variable global para el temporizador

function handleQuestion(question) {
const chatBox = document.getElementById("chat-box");

// Cancelar cualquier temporizador activo para mostrar la opción de continuar
clearTimeout(continuePromptTimer);

// Mostrar el mensaje del usuario
const userMessage = document.createElement("div");
userMessage.className = "message user-message";
userMessage.innerText = question;
chatBox.appendChild(userMessage);

// Eliminar las opciones de pregunta
const options = document.querySelectorAll(".question-option");
options.forEach(option => option.remove());

// Simular el indicador de escritura
const typingIndicator = createTypingIndicator();
chatBox.appendChild(typingIndicator);

setTimeout(() => {
typingIndicator.remove();
const botMessage = document.createElement("div");
botMessage.className = "message bot-message";

if (question === "¿Deseas contactarte con un asesor(a) que te brinde los precios de las matrículas y pensiones?") {
    // Caso especial para esta pregunta
    botMessage.innerHTML = `
       <b> Puedes contactarnos a los siguientes números:</b><br>
        <b>CHILCA:</b> 064-212189<br>
        <b>HUANCAYO:</b> 064-208201<br><br>
        Por favor, escribe tu mensaje para el asesor(a):
        <div style="margin-top: 10px;">
            <input type="text" id="userMessageInput" placeholder="Escribe tu mensaje..." style="width: 80%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;">
            <button onclick="sendToWhatsApp()" style="padding: 8px 10px; margin-left: 5px; background-color: #0078d7; color: white; border: none; border-radius: 5px; cursor: pointer;">Enviar</button>
        </div>`;
    chatBox.appendChild(botMessage);
} else if (followUpQuestions[question]) {
    // Preguntas con opciones de seguimiento
    botMessage.innerText = "Por favor, selecciona una opción:";
    chatBox.appendChild(botMessage);
    displayQuestionOptions(followUpQuestions[question]);
} else if (finalAnswers[question]) {
    // Respuestas finales
    botMessage.innerHTML = finalAnswers[question];
    chatBox.appendChild(botMessage);
} else {
    // Pregunta no entendida
    botMessage.innerText = "Lo siento, no entiendo tu consulta. Por favor, intenta con otra pregunta.";
    chatBox.appendChild(botMessage);
}

chatBox.scrollTop = chatBox.scrollHeight;

// Activar temporizador para mostrar opción de continuar
continuePromptTimer = setTimeout(() => displayContinueOption(), 2000); // 5 segundos después de la respuesta
}, 2000); // Simula el tiempo de espera antes de mostrar la respuesta
}

function displayContinueOption() {
const chatBox = document.getElementById("chat-box");

const continueMessage = document.createElement("div");
continueMessage.className = "message bot-message";
continueMessage.innerText = "¿Quieres seguir conversando con el chatbot?";

chatBox.appendChild(continueMessage);

const continueYes = document.createElement("div");
continueYes.className = "question-option";
continueYes.innerText = "Sí";
continueYes.onclick = () => {
// Eliminar opciones de continuar y cargar nuevas preguntas
const continueOptions = document.querySelectorAll(".question-option");
continueOptions.forEach(option => option.remove());

displayQuestionOptions(initialQuestions);
};

const continueNo = document.createElement("div");
continueNo.className = "question-option";
continueNo.innerText = "No";
continueNo.onclick = () => {
const goodbyeMessage = document.createElement("div");
goodbyeMessage.className = "message bot-message";
goodbyeMessage.innerText = "¡Gracias por conversar! ¡Hasta luego!";
chatBox.appendChild(goodbyeMessage);

// Eliminar las opciones de continuar
const continueOptions = document.querySelectorAll(".question-option");
continueOptions.forEach(option => option.remove());
};

chatBox.appendChild(continueYes);
chatBox.appendChild(continueNo);
chatBox.scrollTop = chatBox.scrollHeight;
}

function createTypingIndicator() {
const typingIndicator = document.createElement("div");
typingIndicator.className = "typing-indicator";
typingIndicator.innerHTML = "<div></div><div></div><div></div>";
return typingIndicator;
}

    







    // Mostrar el mensaje del usuario
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.innerText = question;
    chatBox.appendChild(userMessage);

    // Eliminar las opciones de pregunta
    const options = document.querySelectorAll(".question-option");
    options.forEach(option => option.remove());

    // Simular el indicador de escritura
    const typingIndicator = createTypingIndicator();
    chatBox.appendChild(typingIndicator);

    setTimeout(() => {
        typingIndicator.remove();
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.innerHTML = finalAnswers[question] || "";
        chatBox.appendChild(botMessage);

        // Mostrar nuevas preguntas si las hay
        if (followUpQuestions[question]) {
            setTimeout(() => displayQuestionOptions(followUpQuestions[question]), 1000);
        } else {
            setTimeout(() => displayContinueOption(), 1000);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000); // Simula el tiempo de espera antes de mostrar la respuesta


function displayContinueOption() {
    const chatBox = document.getElementById("chat-box");

    const continueMessage = document.createElement("div");
    continueMessage.className = "message bot-message";
    continueMessage.innerText = "¿Quieres seguir conversando con el chatbot?";

    chatBox.appendChild(continueMessage);

    const continueYes = document.createElement("div");
    continueYes.className = "question-option";
    continueYes.innerText = "Sí";
    continueYes.onclick = () => {
        // Eliminar opciones de continuar y cargar nuevas preguntas
        const continueOptions = document.querySelectorAll(".question-option");
        continueOptions.forEach(option => option.remove());

        displayQuestionOptions(initialQuestions);
    };

    const continueNo = document.createElement("div");
    continueNo.className = "question-option";
    continueNo.innerText = "No";
    continueNo.onclick = () => {
        const goodbyeMessage = document.createElement("div");
        goodbyeMessage.className = "message bot-message";
        goodbyeMessage.innerText = "¡Gracias por conversar! ¡Hasta luego!";
        chatBox.appendChild(goodbyeMessage);

        // Eliminar las opciones de continuar
        const continueOptions = document.querySelectorAll(".question-option");
        continueOptions.forEach(option => option.remove());
    };

    chatBox.appendChild(continueYes);
    chatBox.appendChild(continueNo);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function createTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerHTML = "<div></div><div></div><div></div>";
    return typingIndicator;
}

// Detectar clic fuera del chatbot para cerrarlo
document.addEventListener("click", function (event) {
    const chatContainer = document.getElementById("chat-container");
    const chatToggleButton = document.getElementById("chat-toggle");

    // Si el clic es fuera del contenedor del chat y del botón flotante
    if (!chatContainer.contains(event.target) && !chatToggleButton.contains(event.target)) {
        chatContainer.style.display = "none";
    }
});

// Evitar el cierre si el clic es dentro del chat
document.getElementById("chat-container").addEventListener("click", function (event) {
    event.stopPropagation();
});
