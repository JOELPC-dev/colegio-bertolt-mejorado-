document.addEventListener('DOMContentLoaded', function() {

    // Tu objeto de datos original. Lo dejamos intacto como pediste.
    const calendarData = {
        'MARZO 2025': {
            events: [
                { day: 3, title: "Apertura del año académico", category: "Eventos Académicos", description: "Ceremonia de inicio del año escolar.", time: "9:00 AM", location: "Patio Principal" },
                { day: 8, title: "Sensibilización a los estudiantes sobre convivencia escolar", category: "Eventos Académicos", description: "Talleres de convivencia.", time: "10:00 AM", location: "Auditorio" },
                { day: 22, title: "Día mundial del agua", category: "Eventos Culturales" },
                { day: 28, title: "Semana Santa", category: "Días Feriados" }
            ]
        },
        'ABRIL 2025': {
            events: [
                { day: 1, title: "Día de la Educación", category: "Eventos Académicos" },
                { day: 2, title: "Día mundial del libro", category: "Eventos Culturales" }
            ]
        },
        'MAYO 2025': {
            events: [
                { day: 2, title: "Desfile por Aniversario de Chilca", category: "Eventos Culturales" },
                { day: 11, title: "Día de la Madre", category: "Eventos Culturales" },
                { day: 24, title: "Día de Educación Inicial", category: "Eventos Académicos" }
            ]
        },
        'JUNIO 2025': {
            events: [
                { day: 15, title: "Campeonato deportivo de los estudiantes", category: "Eventos Culturales" },
                { day: 19, title: "Exposición de investigación científica Inicial", category: "Eventos Académicos" },
                { day: 20, title: "Exposición de investigación científica Primaria", category: "Eventos Académicos" },
                { day: 21, title: "Exposición de investigación científica Secundaria", category: "Eventos Académicos" },
                { day: 24, title: "Día del Campesino (actividad interna)", category: "Eventos Culturales" }
            ]
        },
        'JULIO 2025': {
            events: [
                { day: 5, title: "Día del maestro", category: "Eventos Culturales" },
                { day: 15, title: "Semana patriótica", category: "Eventos Culturales" },
                { day: 19, title: "I Fase del Día del Logro", category: "Eventos Académicos" },
                { day: 19, title: "Examen de verificación letras", category: "Eventos Académicos" },
                { day: 22, title: "Examen de verificación ciencias", category: "Eventos Académicos" },
                { day: 26, title: "Desfile Huancayo", category: "Eventos Culturales" },
                { day: 23, title: "Vacaciones del medio año", category: "Días Feriados" }
            ]
        },
        'AGOSTO 2025': {
            events: [
                { day: 6, title: "Batalla de Junín", category: "Días Feriados" },
                { day: 30, title: "Santa Rosa de Lima", category: "Días Feriados" }
            ]
        },
        'SEPTIEMBRE 2025': {
            events: [
                { day: 27, title: "Aniversario del colegio", category: "Eventos Culturales" },
                { day: 27, title: "Concurso de danzas de padres de familia", category: "Eventos Culturales" }
            ]
        },
        'OCTUBRE 2025': { // Corregido: sin espacio al inicio
            events: [
                { day: 1, title: "Mes morado: Señor de los Milagros", category: "Eventos Culturales" },
                { day: 8, title: "Batalla de Angamos", category: "Días Feriados" },
                { day: 17, title: "Demostración de talleres", category: "Eventos Académicos" }
            ]
        },
        'NOVIEMBRE 2025': { // Corregido: sin espacio en el mes
            events: [
                { day: 1, title: "Días feriados: 01 y 02 (Todos los Santos)", category: "Días Feriados" },
                { day: 13, title: "II Exposición de trabajo de investigación: 13, 14 y 15", category: "Eventos Académicos" },
                { day: 20, title: "Derechos del niño", category: "Eventos Culturales" }
            ]
        },
        'DICIEMBRE 2025': {
            events: [
                { day: 12, title: "II Fase del Día del logro: 12 y 13", category: "Eventos Académicos" },
                { day: 18, title: "Concurso de villancicos", category: "Eventos Culturales" },
                { day: 23, title: "Examen de verificación letras", category: "Eventos Académicos" },
                { day: 23, title: "Examen de verificación ciencias", category: "Eventos Académicos" },
                { day: 23, title: "Clausura del año escolar", category: "Eventos Académicos" }
            ]
        }
    };

    // 1. FUNCIÓN PARA TRANSFORMAR TUS DATOS AL FORMATO DE FULLCALENDAR
    function transformDataForFullCalendar(data) {
        const events = [];
        const monthMap = {
            "ENERO": 0, "FEBRERO": 1, "MARZO": 2, "ABRIL": 3, "MAYO": 4, "JUNIO": 5,
            "JULIO": 6, "AGOSTO": 7, "SEPTIEMBRE": 8, "OCTUBRE": 9, "NOVIEMBRE": 10, "DICIEMBRE": 11
        };

        for (const monthYear in data) {
            // Limpiamos la clave por si tiene espacios extra
            const key = monthYear.trim().toUpperCase();
            const [monthName, year] = key.split(' ');
            
            if (monthMap[monthName] !== undefined && year) {
                const monthIndex = monthMap[monthName];
                
                data[monthYear].events.forEach(event => {
                    // Mapeo de categoría a clase CSS para el color
                    let className = '';
                    if (event.category.includes('Académico')) className = 'event-academic';
                    if (event.category.includes('Cultural')) className = 'event-cultural';
                    if (event.category.includes('Feriado')) className = 'event-holiday';

                    events.push({
                        title: event.title,
                        start: new Date(year, monthIndex, event.day),
                        allDay: true, // Todos los eventos son de día completo por defecto
                        classNames: [className], // Agregamos la clase para el color
                        extendedProps: { // Guardamos tus datos originales aquí
                            category: event.category,
                            description: event.description,
                            time: event.time,
                            location: event.location,
                            day: event.day
                        }
                    });
                });
            }
        }
        return events;
    }

    // 2. ELEMENTOS DEL DOM Y VARIABLES
    const calendarEl = document.getElementById('calendar');
    const currentMonthElement = document.getElementById("currentMonth");
    const eventsListElement = document.getElementById("eventsList");
    const eventsCountElement = document.getElementById("eventsCount");
    const eventModal = document.getElementById("eventModal");

    // 3. INICIALIZACIÓN DE FULLCALENDAR
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es', // ¡Importante para tener los nombres en español!
        headerToolbar: false, // Usaremos nuestra propia cabecera
        events: transformDataForFullCalendar(calendarData),
        height: 'auto', // Se ajusta al contenedor

        // Hook que se dispara cada vez que cambia el mes
        datesSet: function(info) {
            // Actualizar el título del mes en tu cabecera
            const title = info.view.title.toUpperCase();
            currentMonthElement.textContent = title;
            
            // Actualizar la lista de eventos del mes
            const start = info.start;
            const end = info.end;
            const eventsInView = calendar.getEvents().filter(event => {
                return event.start >= start && event.start < end;
            });
            renderEventsList(eventsInView);
        },
        
        // Hook que se dispara al hacer clic en un evento
        eventClick: function(info) {
            info.jsEvent.preventDefault(); // Prevenir navegación
            showEventModal(info.event);
        }
    });

    // Renderizar el calendario
    calendar.render();


    // 4. FUNCIONES ACTUALIZADAS PARA TU UI
    function renderEventsList(events) {
        eventsListElement.innerHTML = "";
        eventsCountElement.textContent = `${events.length} Eventos`;

        // Ordenar por día
        events.sort((a, b) => a.extendedProps.day - b.extendedProps.day);

        if (events.length === 0) {
            eventsListElement.innerHTML = '<p class="no-events">No hay eventos para este mes.</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.className = "event-card";
            const monthShort = event.start.toLocaleString('es-ES', { month: 'short' }).toUpperCase();

            eventCard.innerHTML = `
                <div class="event-date">
                    <span class="event-day">${event.extendedProps.day}</span>
                    <span class="event-month">${monthShort.replace('.','')}</span>
                </div>
                <div class="event-details">
                    <a href="#" class="event-name">${event.title}</a>
                    <span class="event-category">${event.extendedProps.category}</span>
                </div>
            `;

            // Hacemos que toda la tarjeta sea clickeable para abrir el modal
            eventCard.addEventListener('click', () => showEventModal(event));
            eventsListElement.appendChild(eventCard);
        });
    }

    function showEventModal(event) {
        // Obtenemos los datos del objeto de evento de FullCalendar
        const { title, extendedProps, start } = event;
        const monthName = start.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        
        document.getElementById("modalDate").textContent = `${extendedProps.day} ${monthName}`;
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalCategory").textContent = extendedProps.category;
        document.getElementById("modalDescription").textContent = extendedProps.description || "No hay una descripción detallada para este evento.";
        document.getElementById("modalTime").textContent = extendedProps.time || "Todo el día";
        document.getElementById("modalLocation").textContent = extendedProps.location || "Ubicación no especificada";
        
        eventModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    // 5. EVENT LISTENERS PARA TUS CONTROLES
    document.getElementById("prevMonth").addEventListener("click", () => {
        calendar.prev(); // API de FullCalendar para ir al mes anterior
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        calendar.next(); // API de FullCalendar para ir al mes siguiente
    });

    // Lógica para cerrar el modal
    document.querySelector(".modal-close").addEventListener("click", () => {
        eventModal.classList.remove("active");
        document.body.style.overflow = "";
    });

    eventModal.addEventListener("click", (e) => {
        if (e.target === eventModal) {
            eventModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});