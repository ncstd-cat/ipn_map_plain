var subjectObject = {
    "Padre/Madre/tutor(a)": ["Inscripcion de estudiante",
                             "Solicitud de beca escolar",
                             "Certificado de matricula",
                             "Autorizacion para salida escolar",
                             "Cambio de tutoria"],

    "Estudiante":[ "Inscripción en materias",
                   "Solicitud de cambio de grupo",
                   "Reinscripción anual",
                   "Solicitar constancia de estudios",
                   "Solicitud de beca o ayuda financiera"],

    "Docente": ["Asignación de horas de clase",
                "Solicitud de vacaciones o licencia",
                "Registro de calificaciones",
                "Acceso a recursos didácticos",
                "Participación en capacitaciones"],

    "Administrativo/a": ["Procesamiento de pagos y matrículas",
                         "Solicitud de permisos o ausencias",
                         "Elaboración de informes administrativos",
                         "Gestión de documentación escolar",
                         "Acceso a bases de datos y registros"],

    "Otro/a": ["Solicitud de visitas a las instalaciones",
               "Consulta sobre programas educativos",
               "Solicitud de colaboración externa",
               "Inscripción a eventos especiales",
               "Petición de información sobre políticas educativas"],
}

var academicSecretariatUsers = [
    { name: "Lucía Hernández", position: "Coordinadora Académica", tasks: ["Inscripción de estudiante", "Solicitud de beca escolar", "Certificado de matrícula", "Autorización para salida escolar", "Cambio de tutoría"] },
    { name: "Eduardo López", position: "Secretario/a Académico/a", tasks: ["Inscripción en materias", "Solicitud de cambio de grupo", "Reinscripción anual", "Solicitar constancia de estudios", "Solicitud de beca o ayuda financiera"] },
    { name: "Valentina García", position: "Jefe de Departamento Académico", tasks: ["Asignación de horas de clase", "Solicitud de vacaciones o licencia", "Registro de calificaciones", "Acceso a recursos didácticos", "Participación en capacitaciones"] },
    { name: "José Manuel Rodríguez", position: "Asistente Académico/a", tasks: ["Procesamiento de pagos y matrículas", "Solicitud de permisos o ausencias", "Elaboración de informes administrativos", "Gestión de documentación escolar", "Acceso a bases de datos y registros"] },
    { name: "Carla Martínez", position: "Encargada de Inscripciones", tasks: ["Solicitud de visitas a las instalaciones", "Consulta sobre programas educativos", "Solicitud de colaboración externa", "Inscripción a eventos especiales", "Petición de información sobre políticas educativas"] },
    { name: "Santiago Torres", position: "Coordinador/a de Exámenes", tasks: ["Inscripción de estudiante", "Solicitud de beca escolar", "Certificado de matrícula", "Autorización para salida escolar", "Cambio de tutoría"] },
    { name: "Andrea Pérez", position: "Responsable de Becas", tasks: ["Inscripción en materias", "Solicitud de cambio de grupo", "Reinscripción anual", "Solicitar constancia de estudios", "Solicitud de beca o ayuda financiera"] },
    { name: "Fernando López", position: "Supervisor/a de Evaluaciones", tasks: ["Asignación de horas de clase", "Solicitud de vacaciones o licencia", "Registro de calificaciones", "Acceso a recursos didácticos", "Participación en capacitaciones"] },
    { name: "Patricia Sánchez", position: "Encargado/a de Planificación Académica", tasks: ["Procesamiento de pagos y matrículas", "Solicitud de permisos o ausencias", "Elaboración de informes administrativos", "Gestión de documentación escolar", "Acceso a bases de datos y registros"] },
    { name: "Juan Carlos Ramírez", position: "Técnico/a en Gestión Académica", tasks: ["Solicitud de visitas a las instalaciones", "Consulta sobre programas educativos", "Solicitud de colaboración externa", "Inscripción a eventos especiales", "Petición de información sobre políticas educativas"] },
    { name: "María Isabel Fernández", position: "Atención al Estudiante", tasks: ["Inscripción de estudiante", "Solicitud de beca escolar", "Certificado de matrícula", "Autorización para salida escolar", "Cambio de tutoría"] },
    { name: "Javier Díaz", position: "Encargado/a de Programas Académicos", tasks: ["Inscripción en materias", "Solicitud de cambio de grupo", "Reinscripción anual", "Solicitar constancia de estudios", "Solicitud de beca o ayuda financiera"] }
];

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});

var markers = [
    { name: "Lucía Hernández", coords: [750, 250], },
    { name: "Eduardo López", coords: [750, 300], },
    { name: "Valentina García", coords: [750, 350], },
    { name: "José Manuel Rodríguez", coords: [750, 400], },
    { name: "Carla Martínez", coords: [750, 450], },
    { name: "Santiago Torres", coords: [750, 500], },
    { name: "Andrea Pérez",     coords: [750, 550], },
    { name: "Fernando López", coords:   [750, 600], },
    { name: "Patricia Sánchez", coords: [750, 650], },
    { name: "Juan Carlos Ramírez", coords: [750, 700], },
    { name: "María Isabel Fernández", coords: [750, 750], },
    { name: "Javier Díaz", coords: [750, 800], }];



var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('src/map.png', bounds).addTo(map);
var zoomLvl = 1;
var entranceCoords = [659,356];

//map.setView([750,500], zoomLvl);

window.onload = function() {
    var usrType = document.getElementById("userTypeSelect");
    var transactionType = document.getElementById("TrsctnTypeSelect");
    var transDiv = document.getElementById("transactionType");
    var resultName = document.getElementById("resultName");
    var resultPosition = document.getElementById("resultPosition");
    var resultDiv = document.getElementById("result");
    var mapDiv = document.getElementById("map");
    var activeMarker = null;
    var personIcon = L.icon({
        iconUrl: 'src/user.png',
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [1, 1], // size of the shadow
        iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
        shadowAnchor: [1, 1],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    var personMarker = L.marker(entranceCoords, {icon: personIcon}).addTo(map);
    for (var x in subjectObject) {
        usrType.options[usrType.options.length] = new Option(x, x);
    }
    mapDiv.style.display = "none";
    usrType.onchange = function() {
        //empty Chapters- and Topics- dropdowns
        transactionType.length = 1;
        transDiv.style.display = "block";
        for (var y in subjectObject[this.value]) {
            transactionType.options[transactionType.options.length] = new Option(subjectObject[this.value][y], subjectObject[this.value][y]);
        }
        resultDiv.style.display = "none";
        mapDiv.style.display = "none";

    }
    transactionType.onchange = function() {
        var selectedTransaction = transactionType.value;
        var responsiblePerson = null;
        var usersArray = academicSecretariatUsers;  // Aquí seleccionas la lista de usuarios que prefieras
        console.log(usersArray.length)
        for (var i = 0; i < usersArray.length; i++) {
            if (usersArray[i].tasks.includes(selectedTransaction)) {
                console.log(selectedTransaction);
                console.log(usersArray[i].tasks)
                console.log(usersArray[i].tasks.includes(selectedTransaction));
                responsiblePerson = usersArray[i];  // Guardamos el nombre de la persona
                break;  // Salimos del bucle al encontrar la primera coincidencia
            }
        }
        if (responsiblePerson) {
            resultDiv.style.display = "block";
            resultName.innerHTML = responsiblePerson.name;
            resultPosition.innerHTML = responsiblePerson.position;
            mapDiv.style.display = "block";
            var personCoords = markers.find(marker => marker.name === responsiblePerson.name).coords;
            if (activeMarker) {
                map.removeLayer(activeMarker);
            }
            activeMarker = L.marker(personCoords);

            map.addLayer(activeMarker);
            map.fitBounds(bounds);
            map.setView(personCoords, zoomLvl);

        } else {
            console.log("Ninguna persona encontrada para el trámite: " + selectedTransaction);
        }

    }
}