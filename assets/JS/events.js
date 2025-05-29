// Configuración inicial del calendario
const calendarData = {
    'MARZO 2024': {
        events: [
            { day: 3, title: "Apertura del año académico", category: "Eventos para toda la escuela" },
            { day: 8, title: "Sensibilización a los estudiantes sobre convivencia escolar", category: "Eventos para toda la escuela" },
            { day: 22, title: "Día mundial del agua", category: "Eventos para toda la escuela" },
            { day: 28, title: "Semana Santa", category: "Eventos para toda la escuela" }
            
        ],
        daysInMonth: 30,
        firstDay: 5 // Viernes
    },
    'ABRIL 2024': {
        events: [
            { day: 1, title: "Día de la Educación", category: "Eventos para toda la escuela" },
            { day: 2, title: "Dia mundial del libro", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    'MAYO 2024': {
        events: [
            { day: 2, title: "Desfile por Aniversario de Chilca", category: "Eventos para toda la escuela" },
            { day: 11, title: "Dia de la Madre", category: "Eventos para toda la escuela" },
            { day: 24, title: "Día de Educación Inicial", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    'JUNIO 2024': {
        events: [
            { day: 15, title: "Campeonato deportivo de los estudiantes", category: "Eventos para toda la escuela" },
            { day: 19, title: "Exposición de investigación científica  Inicial", category: "Eventos para toda la escuela" },
            { day: 20, title: "Exposición de investigación científica  Primaria", category: "Eventos para toda la escuela" },
            { day: 21, title: "Exposición de investigación científica  Secundaria", category: "Eventos para toda la escuela" },
            { day: 24, title: "Dia del Campesino (actividad interna)", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 30,
        firstDay: 0 // Domingo
    },
    'JULIO 2024': {
        events: [
            { day: 5, title: "Dia del maestro", category: "Eventos para toda la escuela" },
            { day: 15,title: "Semana patriótica", category: "Eventos para toda la escuela" },
            { day: 19, title: "I Fase del Día del Logro", category: "Eventos para toda la escuela" },
            { day: 19, title: "Examen de verificación letras", category: "Eventos para toda la escuela" },
            { day: 22, title: "Examen de verificación ciencias", category: "Eventos para toda la escuela" },
            { day: 26, title: "Desfile Huancayo", category: "Eventos para toda la escuela" },
            { day: 23, title: "Vacaciones del medio año", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    'AGOSTO 2024': {
        events: [
            { day: 6, title: "Batalla de Junín", category: "Eventos para toda la escuela" },
            { day: 30, title: "Santa Rosa de Lima", category: "Eventos para toda la escuela" }
           
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    'SEPTIEMBRE 2024': {
        events: [
            { day: 27, title: "Aniversario del colegio", category: "Eventos para toda la escuela" },
            { day: 27, title: "Concurso de danzas de padres de familia", category: "Eventos para toda la escuela" }
           
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    ' OCTUBRE 2024': {
        events: [
            { day: 1, title: "Mes morado: Señor de los Milagros", category: "Eventos para toda la escuela" },
            { day: 8, title: "Batalla de Angamos", category: "Eventos para toda la escuela" },
            { day: 17, title: "	Demostración de talleres", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },'NOVIEMBRE2024': {
        events: [
            { day: 1, title: "Días feriados: 01 y 02 (Todos los Santos)", category: "Eventos para toda la escuela" },
            { day: 13, title: "II Exposición de trabajo de investigación: 13, 14 y 15", category: "Eventos para toda la escuela" },
            { day: 20, title: "Derechos del niño", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    },
    'DICIEMBRE 2024': {
        events: [
            { day: 12, title: "II Fase del Día del logro: 12 y 13", category: "Eventos para toda la escuela" },
            { day: 18, title: "Concurso de villancicos", category: "Eventos para toda la escuela" },
            { day: 23, title: "Examen de verificación letras", category: "Eventos para toda la escuela" },
            { day: 23, title: "Examen de verificación ciencias", category: "Eventos para toda la escuela" },
            { day: 23, title: "Clausura del año escolar", category: "Eventos para toda la escuela" }
        ],
        daysInMonth: 31,
        firstDay: 0 // Domingo
    }
};

const currentMonthElement = document.getElementById("currentMonth");
const eventsListElement = document.getElementById("eventsList");
const calendarTableElement = document.getElementById("calendarTable");

let currentMonth = "MARZO 2024";

// Función para renderizar eventos
function renderEvents(month) {
    eventsListElement.innerHTML = ""; // Limpia eventos anteriores
    const events = calendarData[month].events;
    events.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
            <div class="date-box">
                <span class="day">${event.day}</span>
                <span class="month">${month.split(' ')[0].toUpperCase()}</span>
            </div>
            <div class="event-details">
                <a href="#" class="event-title" data-event='${JSON.stringify(event)}'>${event.title}</a>
                <span class="event-category">${event.category}</span>
            </div>
        `;
        eventsListElement.appendChild(eventItem);
    });

    // Agregar listener al hacer clic en un título de evento
    document.querySelectorAll(".event-title").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const eventData = JSON.parse(e.target.getAttribute("data-event"));
            // Guardar datos del evento en localStorage
            localStorage.setItem("selectedEvent", JSON.stringify(eventData));
            // Redirigir a la página de detalles
            window.location.href = "event-details.html";
        });
    });
}

// Función para renderizar el calendario
function renderCalendar(month) {
    const { daysInMonth, firstDay } = calendarData[month];
    calendarTableElement.innerHTML = ""; // Limpia el calendario anterior

    // Encabezado de los días de la semana
    const headerRow = document.createElement("tr");
    ["L", "M", "M", "J", "V", "S", "D"].forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarTableElement.appendChild(headerRow);

    // Generar celdas del calendario
    let day = 1;
    for (let i = 0; day <= daysInMonth; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay || day > daysInMonth) {
                // Celda vacía
                cell.innerHTML = "";
            } else {
                cell.textContent = day++;
            }
            row.appendChild(cell);
        }
        calendarTableElement.appendChild(row);
    }
}

// Función para cambiar de mes
function changeMonth(direction) {
    const months = Object.keys(calendarData);
    let currentIndex = months.indexOf(currentMonth);

    if (direction === "next" && currentIndex < months.length - 1) {
        currentMonth = months[currentIndex + 1];
    } else if (direction === "prev" && currentIndex > 0) {
        currentMonth = months[currentIndex - 1];
    }

    currentMonthElement.textContent = currentMonth;
    renderEvents(currentMonth);
    renderCalendar(currentMonth);
}

// Listeners para los botones
document.getElementById("prevMonth").addEventListener("click", () => changeMonth("prev"));
document.getElementById("nextMonth").addEventListener("click", () => changeMonth("next"));

// Renderizado inicial
renderEvents(currentMonth);
renderCalendar(currentMonth);
