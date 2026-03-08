// ========================================
// SISTEMA DEL JUEGO - LABORATORIO CONDUCTUAL
// ========================================
let usuarioActual = null;
let nivelActual = 1;
let tiempoInicio = null;

// ========================================
// VARIABLES DEL CANVAS - NIVEL 2
// ========================================
let canvas, ctx;
let auto = {
    x: 50,
    y: 300,
    velocidad: 0,
    angulo: 0,
    color: '#FFD700'
};
let camino = [];
let obstaculos = [];
let meta = { x: 0, y: 0 };
let animacionActiva = false;
let distanciaTotal = 0;
let distanciaActual = 0;

// ========================================
// DATOS DE LOS 4 NIVELES (POR DEFECTO)
// ========================================
const nivel1Datos = {
    preguntas: [
        {
            emoji: '📖',
            escenario: 'Un estudiante recibe un elogio después de estudiar',
            opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
            correcta: 0,
            explicacion: '¡Correcto! El elogio es un estímulo agradable que aumenta la conducta.'
        },
        {
            emoji: '🔇',
            escenario: 'Se elimina el ruido molesto cuando el alumno se concentra',
            opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
            correcta: 1,
            explicacion: '¡Exacto! Eliminar un estímulo desagradable es Refuerzo Negativo.'
        },
        {
            emoji: '📱',
            escenario: 'Un niño pierde el celular por portarse mal',
            opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
            correcta: 2,
            explicacion: 'Correcto. La pérdida de privilegios disminuye la conducta.'
        },
        {
            emoji: '😤',
            escenario: 'Dejas de prestar atención a los berrinches',
            opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
            correcta: 3,
            explicacion: '¡Bien! Al no reforzar, la conducta disminuye (Extinción).'
        },
        {
            emoji: '⭐',
            escenario: 'Recibes puntos extra por completar tareas',
            opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
            correcta: 0,
            explicacion: '¡Correcto! Los puntos son un estímulo agradable agregado.'
        }
    ]
};

const nivel2Datos = {
    preguntas: [
        {
            escenario: 'El estudiante estudia 1 hora. ¿Qué aplicas para aumentar esta conducta?',
            correcta: 'positivo',
            explicacion: '¡Correcto! El refuerzo positivo aumenta la probabilidad de estudiar.'
        },
        {
            escenario: 'El niño ordena su cuarto. ¿Qué consecuencia fortalece esta conducta?',
            correcta: 'positivo',
            explicacion: '¡Bien! Un estímulo agradable después de ordenar aumenta la conducta.'
        },
        {
            escenario: 'El alumno interrumpe la clase. ¿Qué aplicas para disminuir esta conducta?',
            correcta: 'castigo',
            explicacion: 'Correcto. El castigo disminuye la probabilidad de interrupción.'
        },
        {
            escenario: 'Dejas de prestar atención a los berrinches. ¿Qué principio es?',
            correcta: 'extincion',
            explicacion: '¡Exacto! Al no reforzar, la conducta disminuye (extinción).'
        },
        {
            escenario: 'Eliminas tarea extra cuando el alumno se porta bien. ¿Qué es?',
            correcta: 'negativo',
            explicacion: '¡Correcto! Eliminar estímulo desagradable = Refuerzo Negativo.'
        }
    ]
};

const nivel3Datos = {
    preguntas: [
        {
            programa: 'Razón Fija',
            descripcion: 'Refuerzo después de un número fijo de respuestas',
            ejemplo: 'Cada 5 respuestas correctas = 1 punto',
            pregunta: '¿Qué programa es: premio cada 3 tareas completadas?',
            opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
            correcta: 0,
            explicacion: '¡Correcto! Número fijo de respuestas = Razón Fija.'
        },
        {
            programa: 'Razón Variable',
            descripcion: 'Refuerzo después de un número variable de respuestas',
            ejemplo: 'Premio aleatorio después de 2-5 respuestas',
            pregunta: '¿Qué programa mantiene la conducta por más tiempo?',
            opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
            correcta: 1,
            explicacion: '¡Exacto! La impredecibilidad mantiene la conducta más tiempo.'
        },
        {
            programa: 'Intervalo Fijo',
            descripcion: 'Refuerzo después de un tiempo fijo',
            ejemplo: 'Revisión cada 30 minutos',
            pregunta: '¿Qué programa es: examen cada semana?',
            opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
            correcta: 2,
            explicacion: '¡Correcto! Tiempo fijo = Intervalo Fijo.'
        },
        {
            programa: 'Intervalo Variable',
            descripcion: 'Refuerzo después de tiempo variable',
            ejemplo: 'Pop quizzes aleatorios',
            pregunta: '¿Qué programa genera respuesta constante?',
            opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
            correcta: 3,
            explicacion: '¡Bien! La incertidumbre del tiempo mantiene la conducta constante.'
        }
    ]
};

const nivel4Datos = {
    tareas: [
        {
            meta: 'Que el estudiante lea 30 minutos diarios',
            pasos: ['Tomar el libro', 'Abrir el libro', 'Leer 5 min', 'Leer 15 min', 'Leer 30 min'],
            pregunta: '¿Qué aproximación debes reforzar primero?',
            opciones: ['Leer 30 minutos', 'Tomar el libro', 'Leer 15 minutos', 'Abrir el libro'],
            correcta: 1,
            explicacion: '¡Correcto! En moldeamiento se empieza por la aproximación más simple.'
        },
        {
            meta: 'Que el alumno participe en clase',
            pasos: ['Levantar la mano', 'Responder cuando preguntan', 'Participar voluntariamente'],
            pregunta: '¿Cuál es la conducta meta final?',
            opciones: ['Levantar la mano', 'Responder cuando preguntan', 'Participar voluntariamente', 'Escuchar en clase'],
            correcta: 2,
            explicacion: '¡Exacto! La conducta meta es el objetivo final del moldeamiento.'
        },
        {
            meta: 'Que el niño ordene su habitación',
            pasos: ['Recoger un juguete', 'Recoger todos los juguetes', 'Hacer la cama', 'Ordenar todo'],
            pregunta: 'Si refuerzas solo el paso final, ¿qué pasa?',
            opciones: ['Aprende más rápido', 'Se frustra y abandona', 'No hay diferencia', 'Aprende mejor'],
            correcta: 1,
            explicacion: '¡Correcto! Sin aproximaciones sucesivas, el estudiante se frustra.'
        },
        {
            meta: 'Que escriba un ensayo completo',
            pasos: ['Escribir una oración', 'Escribir un párrafo', 'Escribir tres párrafos', 'Ensayo completo'],
            pregunta: '¿Qué refuerzas después de "escribir un párrafo"?',
            opciones: ['Ensayo completo', 'Escribir tres párrafos', 'Escribir una oración', 'Nada'],
            correcta: 1,
            explicacion: '¡Bien! Se refuerza la siguiente aproximación sucesiva.'
        },
        {
            meta: 'Que resuelva problemas matemáticos',
            pasos: ['Identificar datos', 'Plantear ecuación', 'Resolver operación', 'Verificar resultado'],
            pregunta: '¿Cuál es el primer paso a reforzar?',
            opciones: ['Verificar resultado', 'Resolver operación', 'Identificar datos', 'Plantear ecuación'],
            correcta: 2,
            explicacion: '¡Correcto! Se comienza por la primera aproximación.'
        }
    ]
};

// ========================================
// PREGUNTAS PERSONALIZADAS POR AVATAR
// ========================================
const preguntasPorAvatar = {
    cientifico: {
        nombre: 'El Científico',
        estilo: 'Teórico y analítico',
        nivel1: [
            {
                emoji: '🔬',
                escenario: 'En un experimento, una rata presiona una palanca y recibe comida',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 0,
                explicacion: '¡Correcto! La comida es un estímulo agradable que aumenta la conducta.'
            },
            {
                emoji: '📊',
                escenario: 'Un investigador analiza datos de frecuencia conductual',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Análisis de datos'],
                correcta: 3,
                explicacion: '¡Bien! El científico se enfoca en el análisis de datos.'
            },
            {
                emoji: '🧪',
                escenario: 'Se elimina una luz brillante cuando el sujeto realiza la conducta correcta',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 1,
                explicacion: '¡Exacto! Eliminar un estímulo desagradable es Refuerzo Negativo.'
            },
            {
                emoji: '📈',
                escenario: 'La gráfica muestra aumento progresivo de conductas',
                opciones: ['Moldeamiento', 'Extinción', 'Castigo', 'Refuerzo'],
                correcta: 0,
                explicacion: '¡Correcto! El moldeamiento muestra aproximaciones sucesivas.'
            },
            {
                emoji: '🎯',
                escenario: 'Cada 5 respuestas correctas se otorga un punto',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 0,
                explicacion: '¡Bien! Número fijo de respuestas = Razón Fija.'
            }
        ],
        nivel2: [
            {
                escenario: 'Para aumentar la conducta de estudio en un experimento, ¿qué aplicarías?',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo es la base del aumento conductual.'
            },
            {
                escenario: 'En un laboratorio, ¿cómo eliminarías una conducta no deseada?',
                correcta: 'extincion',
                explicacion: 'La extinción elimina el refuerzo de la conducta.'
            },
            {
                escenario: 'El sujeto recibe comida tras presionar la palanca',
                correcta: 'positivo',
                explicacion: 'La comida es un refuerzo positivo clásico.'
            },
            {
                escenario: 'Se elimina choque eléctrico al realizar conducta correcta',
                correcta: 'negativo',
                explicacion: 'Eliminar estímulo desagradable = Refuerzo Negativo.'
            },
            {
                escenario: 'Dejas de dar comida tras presionar la palanca',
                correcta: 'extincion',
                explicacion: 'Sin refuerzo, la conducta se extingue.'
            }
        ],
        nivel3: [
            {
                programa: 'Razón Fija',
                descripcion: 'Análisis de frecuencia en intervalos regulares',
                pregunta: '¿Qué programa usarías para medir datos cada 10 respuestas?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 0,
                explicacion: '¡Correcto! Número fijo = Razón Fija.'
            },
            {
                programa: 'Razón Variable',
                descripcion: 'Recompensas impredecibles',
                pregunta: '¿Qué programa mantiene la conducta por más tiempo?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Exacto! La impredecibilidad mantiene la conducta.'
            },
            {
                programa: 'Intervalo Fijo',
                descripcion: 'Refuerzo cada tiempo fijo',
                pregunta: '¿Qué programa es: revisión cada 30 minutos?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 2,
                explicacion: '¡Correcto! Tiempo fijo = Intervalo Fijo.'
            },
            {
                programa: 'Intervalo Variable',
                descripcion: 'Chequeos aleatorios',
                pregunta: '¿Qué programa genera respuesta más constante?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 3,
                explicacion: '¡Bien! La incertidumbre mantiene la respuesta constante.'
            }
        ],
        nivel4: [
            {
                meta: 'Que el investigador complete un análisis estadístico',
                pasos: ['Recolectar datos', 'Organizar en tablas', 'Calcular estadísticos', 'Interpretar resultados'],
                pregunta: '¿Cuál es el primer paso del moldeamiento?',
                opciones: ['Interpretar resultados', 'Recolectar datos', 'Calcular estadísticos', 'Organizar tablas'],
                correcta: 1,
                explicacion: '¡Correcto! Se comienza por la primera aproximación.'
            },
            {
                meta: 'Que el sujeto presione la palanca 100 veces',
                pasos: ['Acercarse a la palanca', 'Tocar la palanca', 'Presionar 1 vez', 'Presionar 100 veces'],
                pregunta: '¿Qué aproximación refuerzas primero?',
                opciones: ['Presionar 100 veces', 'Acercarse a la palanca', 'Tocar la palanca', 'Presionar 1 vez'],
                correcta: 1,
                explicacion: '¡Bien! Se empieza por la aproximación más simple.'
            },
            {
                meta: 'Que el estudiante memorice 50 términos',
                pasos: ['Leer 5 términos', 'Leer 20 términos', 'Leer 35 términos', 'Leer 50 términos'],
                pregunta: '¿Qué paso refuerzas después de "leer 20 términos"?',
                opciones: ['Leer 50 términos', 'Leer 5 términos', 'Leer 35 términos', 'Nada'],
                correcta: 2,
                explicacion: '¡Correcto! Se refuerza la siguiente aproximación.'
            },
            {
                meta: 'Que el investigador publique un artículo',
                pasos: ['Escribir borrador', 'Revisar datos', 'Enviar a revista', 'Publicar'],
                pregunta: '¿Cuál es la conducta meta final?',
                opciones: ['Escribir borrador', 'Revisar datos', 'Enviar a revista', 'Publicar'],
                correcta: 3,
                explicacion: '¡Exacto! La conducta meta es el objetivo final.'
            },
            {
                meta: 'Que el sujeto discrimine entre dos estímulos',
                pasos: ['Mirar estímulo A', 'Tocar estímulo A', 'Presionar ante A', 'Ignorar B'],
                pregunta: '¿Qué refuerzas primero?',
                opciones: ['Ignorar B', 'Mirar estímulo A', 'Tocar estímulo A', 'Presionar ante A'],
                correcta: 1,
                explicacion: '¡Correcto! Se comienza por la primera aproximación.'
            }
        ]
    },
    
    detective: {
        nombre: 'El Detective',
        estilo: 'Observación de patrones',
        nivel1: [
            {
                emoji: '🔍',
                escenario: 'Observas que un sospechoso repite una conducta después de recibir dinero',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 0,
                explicacion: '¡Correcto! El dinero aumenta la conducta (Refuerzo Positivo).'
            },
            {
                emoji: '🕵️',
                escenario: 'El criminal deja de cometer el delito cuando aumentas la vigilancia',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 2,
                explicacion: '¡Bien! La vigilancia actúa como castigo.'
            },
            {
                emoji: '📋',
                escenario: 'Dejas de prestar atención a las pistas falsas',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 3,
                explicacion: '¡Exacto! Ignorar = Extinción.'
            },
            {
                emoji: '🎭',
                escenario: 'El testigo deja de mentir cuando eliminas las recompensas',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 3,
                explicacion: '¡Correcto! Sin refuerzo, la conducta disminuye.'
            },
            {
                emoji: '💰',
                escenario: 'Las recompensas llegan de forma impredecible',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Bien! Impredecible = Variable.'
            }
        ],
        nivel2: [
            {
                escenario: 'Para que el informante hable más, ¿qué aplicarías?',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo aumenta la conducta de hablar.'
            },
            {
                escenario: 'Para eliminar las mentiras del sospechoso, ¿qué harías?',
                correcta: 'castigo',
                explicacion: 'El castigo disminuye la conducta no deseada.'
            },
            {
                escenario: 'El testigo coopera cuando eliminas la presión',
                correcta: 'negativo',
                explicacion: 'Eliminar presión = Refuerzo Negativo.'
            },
            {
                escenario: 'Dejas de investigar pistas falsas',
                correcta: 'extincion',
                explicacion: 'Ignorar = Extinción.'
            },
            {
                escenario: 'Para mantener al informante colaborando a largo plazo',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo mantiene la colaboración.'
            }
        ],
        nivel3: [
            {
                programa: 'Razón Variable',
                descripcion: 'Recompensas impredecibles mantienen la conducta',
                pregunta: '¿Qué programa es mejor para mantener un informante a largo plazo?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Correcto! La impredecibilidad mantiene la conducta.'
            },
            {
                programa: 'Intervalo Fijo',
                descripcion: 'Reportes cada semana',
                pregunta: '¿Qué programa es: informe cada lunes?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 2,
                explicacion: '¡Bien! Tiempo fijo = Intervalo Fijo.'
            },
            {
                programa: 'Razón Fija',
                descripcion: 'Pago por cada 5 pistas',
                pregunta: '¿Qué programa es: pago cada 5 pistas?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 0,
                explicacion: '¡Correcto! Número fijo = Razón Fija.'
            },
            {
                programa: 'Intervalo Variable',
                descripcion: 'Chequeos aleatorios',
                pregunta: '¿Qué programa genera vigilancia constante?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 3,
                explicacion: '¡Exacto! La incertidumbre mantiene la vigilancia.'
            }
        ],
        nivel4: [
            {
                meta: 'Que el sospechoso confiese el crimen',
                pasos: ['Admitir estar en el lugar', 'Reconocer conocer a la víctima', 'Admitir conflicto', 'Confesar'],
                pregunta: '¿Qué aproximación refuerzas primero?',
                opciones: ['Confesar', 'Admitir estar en el lugar', 'Reconocer víctima', 'Admitir conflicto'],
                correcta: 1,
                explicacion: '¡Correcto! Se empieza por la aproximación más simple.'
            },
            {
                meta: 'Que el testigo identifique al culpable',
                pasos: ['Mirar fotos', 'Señalar similar', 'Identificar con certeza', 'Testificar'],
                pregunta: '¿Qué refuerzas después de "señalar similar"?',
                opciones: ['Testificar', 'Mirar fotos', 'Identificar con certeza', 'Nada'],
                correcta: 2,
                explicacion: '¡Bien! Se refuerza la siguiente aproximación.'
            },
            {
                meta: 'Que el informante dé información útil',
                pasos: ['Hablar', 'Dar detalles', 'Dar nombres', 'Dar evidencia'],
                pregunta: '¿Cuál es la conducta meta final?',
                opciones: ['Hablar', 'Dar detalles', 'Dar nombres', 'Dar evidencia'],
                correcta: 3,
                explicacion: '¡Exacto! La evidencia es el objetivo final.'
            },
            {
                meta: 'Que el criminal revele la ubicación',
                pasos: ['Admitir conocimiento', 'Revelar ciudad', 'Revelar zona', 'Revelar dirección'],
                pregunta: '¿Qué aproximación es la primera?',
                opciones: ['Revelar dirección', 'Admitir conocimiento', 'Revelar ciudad', 'Revelar zona'],
                correcta: 1,
                explicacion: '¡Correcto! Se comienza por lo más simple.'
            },
            {
                meta: 'Que el testigo firme la declaración',
                pasos: ['Leer declaración', 'Hacer correcciones', 'Aceptar contenido', 'Firmar'],
                pregunta: '¿Qué refuerzas primero?',
                opciones: ['Firmar', 'Leer declaración', 'Hacer correcciones', 'Aceptar contenido'],
                correcta: 1,
                explicacion: '¡Bien! Se empieza por la primera aproximación.'
            }
        ]
    },
    
    entrenador: {
        nombre: 'El Entrenador',
        estilo: 'Aplicación práctica',
        nivel1: [
            {
                emoji: '🏆',
                escenario: 'Un atleta recibe una medalla después de ganar',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 0,
                explicacion: '¡Correcto! La medalla es refuerzo positivo.'
            },
            {
                emoji: '🎯',
                escenario: 'Eliminas el entrenamiento extra cuando mejora el rendimiento',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 1,
                explicacion: '¡Bien! Eliminar algo desagradable = Refuerzo Negativo.'
            },
            {
                emoji: '⏱️',
                escenario: 'El deportista llega tarde y pierde privilegios',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 2,
                explicacion: '¡Exacto! Perder privilegios es castigo.'
            },
            {
                emoji: '📢',
                escenario: 'Dejas de aplaudir los errores del equipo',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 3,
                explicacion: '¡Correcto! Sin aplausos = Extinción.'
            },
            {
                emoji: '🏅',
                escenario: 'Cada lunes das reconocimiento al mejor jugador',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 2,
                explicacion: '¡Bien! Tiempo fijo (cada lunes) = Intervalo Fijo.'
            }
        ],
        nivel2: [
            {
                escenario: 'Para que el atleta entrene más duro, ¿qué aplicarías?',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo motiva el entrenamiento.'
            },
            {
                escenario: 'Para eliminar los errores técnicos, ¿qué harías?',
                correcta: 'castigo',
                explicacion: 'El castigo corrige los errores.'
            },
            {
                escenario: 'El atleta mejora cuando eliminas la presión',
                correcta: 'negativo',
                explicacion: 'Eliminar presión = Refuerzo Negativo.'
            },
            {
                escenario: 'Dejas de corregir errores menores',
                correcta: 'extincion',
                explicacion: 'Ignorar = Extinción.'
            },
            {
                escenario: 'Para mantener la motivación del equipo',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo mantiene la motivación.'
            }
        ],
        nivel3: [
            {
                programa: 'Intervalo Fijo',
                descripcion: 'Reconocimiento semanal',
                pregunta: '¿Qué programa usas si das premios cada viernes?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 2,
                explicacion: '¡Correcto! Tiempo fijo = Intervalo Fijo.'
            },
            {
                programa: 'Razón Variable',
                descripcion: 'Premios sorpresa',
                pregunta: '¿Qué programa mantiene el esfuerzo constante?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Bien! La impredecibilidad mantiene el esfuerzo.'
            },
            {
                programa: 'Razón Fija',
                descripcion: 'Punto por cada gol',
                pregunta: '¿Qué programa es: punto por cada gol?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 0,
                explicacion: '¡Correcto! Número fijo = Razón Fija.'
            },
            {
                programa: 'Intervalo Variable',
                descripcion: 'Revisiones aleatorias',
                pregunta: '¿Qué programa genera atención constante?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 3,
                explicacion: '¡Exacto! La incertidumbre mantiene la atención.'
            }
        ],
        nivel4: [
            {
                meta: 'Que el atleta corra 10 km sin parar',
                pasos: ['Correr 1 km', 'Correr 3 km', 'Correr 5 km', 'Correr 10 km'],
                pregunta: '¿Qué distancia refuerzas primero?',
                opciones: ['10 km', '1 km', '5 km', '3 km'],
                correcta: 1,
                explicacion: '¡Correcto! Se empieza por la distancia más corta.'
            },
            {
                meta: 'Que el jugador enceste 10 tiros libres',
                pasos: ['Sostener el balón', 'Lanzar 1 tiro', 'Lanzar 5 tiros', 'Lanzar 10 tiros'],
                pregunta: '¿Qué aproximación es la primera?',
                opciones: ['Lanzar 10 tiros', 'Sostener el balón', 'Lanzar 5 tiros', 'Lanzar 1 tiro'],
                correcta: 1,
                explicacion: '¡Bien! Se comienza por lo más simple.'
            },
            {
                meta: 'Que el equipo gane el campeonato',
                pasos: ['Ganar práctica', 'Ganar amistoso', 'Ganar semifinal', 'Ganar final'],
                pregunta: '¿Cuál es la conducta meta final?',
                opciones: ['Ganar práctica', 'Ganar amistoso', 'Ganar semifinal', 'Ganar final'],
                correcta: 3,
                explicacion: '¡Exacto! El campeonato es el objetivo final.'
            },
            {
                meta: 'Que el nadador complete 1000 metros',
                pasos: ['Nadar 100m', 'Nadar 300m', 'Nadar 600m', 'Nadar 1000m'],
                pregunta: '¿Qué refuerzas después de "nadar 300m"?',
                opciones: ['Nadar 1000m', 'Nadar 100m', 'Nadar 600m', 'Nada'],
                correcta: 2,
                explicacion: '¡Correcto! Se refuerza la siguiente aproximación.'
            },
            {
                meta: 'Que el gimnasta ejecute la rutina completa',
                pasos: ['Aprender movimiento 1', 'Aprender movimiento 3', 'Aprender movimiento 5', 'Ejecutar todo'],
                pregunta: '¿Qué refuerzas primero?',
                opciones: ['Ejecutar todo', 'Aprender movimiento 1', 'Aprender movimiento 3', 'Aprender movimiento 5'],
                correcta: 1,
                explicacion: '¡Bien! Se empieza por el primer movimiento.'
            }
        ]
    },
    
    robot: {
        nombre: 'El Robot',
        estilo: 'Análisis de datos preciso',
        nivel1: [
            {
                emoji: '🤖',
                escenario: 'El sistema registra aumento de conductas tras estímulo',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 0,
                explicacion: '¡Correcto! El análisis de datos confirma el refuerzo.'
            },
            {
                emoji: '📊',
                escenario: 'Los datos muestran disminución tras eliminar estímulo',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 3,
                explicacion: '¡Bien! Sin estímulo = Extinción.'
            },
            {
                emoji: '📉',
                escenario: 'La gráfica cae después del castigo',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 2,
                explicacion: '¡Exacto! El castigo disminuye la conducta.'
            },
            {
                emoji: '📈',
                escenario: 'Los datos suben cuando eliminas ruido',
                opciones: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correcta: 1,
                explicacion: '¡Correcto! Eliminar desagradable = Refuerzo Negativo.'
            },
            {
                emoji: '⚡',
                escenario: 'Refuerzos aleatorios generan patrón estable',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Bien! Aleatorio = Variable.'
            }
        ],
        nivel2: [
            {
                escenario: 'Para optimizar el rendimiento del sistema, ¿qué aplicarías?',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo optimiza el sistema.'
            },
            {
                escenario: 'Para eliminar errores del sistema, ¿qué harías?',
                correcta: 'extincion',
                explicacion: 'La extinción elimina conductas no deseadas.'
            },
            {
                escenario: 'El sistema mejora cuando eliminas alertas',
                correcta: 'negativo',
                explicacion: 'Eliminar alertas = Refuerzo Negativo.'
            },
            {
                escenario: 'Dejas de registrar datos erróneos',
                correcta: 'extincion',
                explicacion: 'Ignorar = Extinción.'
            },
            {
                escenario: 'Para mantener el sistema estable',
                correcta: 'positivo',
                explicacion: 'El refuerzo positivo mantiene la estabilidad.'
            }
        ],
        nivel3: [
            {
                programa: 'Intervalo Variable',
                descripcion: 'Chequeos aleatorios del sistema',
                pregunta: '¿Qué programa genera respuesta más constante?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 3,
                explicacion: '¡Correcto! La incertidumbre mantiene la respuesta constante.'
            },
            {
                programa: 'Razón Fija',
                descripcion: 'Procesamiento cada 100 datos',
                pregunta: '¿Qué programa es: proceso cada 100 datos?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 0,
                explicacion: '¡Bien! Número fijo = Razón Fija.'
            },
            {
                programa: 'Intervalo Fijo',
                descripcion: 'Backup cada hora',
                pregunta: '¿Qué programa es: backup cada hora?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 2,
                explicacion: '¡Correcto! Tiempo fijo = Intervalo Fijo.'
            },
            {
                programa: 'Razón Variable',
                descripcion: 'Recompensas aleatorias',
                pregunta: '¿Qué programa mantiene el procesamiento estable?',
                opciones: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correcta: 1,
                explicacion: '¡Exacto! La impredecibilidad mantiene la estabilidad.'
            }
        ],
        nivel4: [
            {
                meta: 'Que el sistema procese 1000 datos/segundo',
                pasos: ['Procesar 100 datos', 'Procesar 300 datos', 'Procesar 600 datos', 'Procesar 1000 datos'],
                pregunta: '¿Qué nivel refuerzas primero?',
                opciones: ['1000 datos', '100 datos', '600 datos', '300 datos'],
                correcta: 1,
                explicacion: '¡Correcto! Se empieza por el nivel más bajo.'
            },
            {
                meta: 'Que la IA reconozca 1000 imágenes',
                pasos: ['Reconocer 100 imágenes', 'Reconocer 300 imágenes', 'Reconocer 600 imágenes', 'Reconocer 1000 imágenes'],
                pregunta: '¿Qué aproximación es la primera?',
                opciones: ['Reconocer 1000 imágenes', 'Reconocer 100 imágenes', 'Reconocer 300 imágenes', 'Reconocer 600 imágenes'],
                correcta: 1,
                explicacion: '¡Bien! Se comienza por la primera aproximación.'
            },
            {
                meta: 'Que el algoritmo optimice el rendimiento',
                pasos: ['Analizar datos', 'Identificar patrones', 'Ajustar parámetros', 'Optimizar'],
                pregunta: '¿Cuál es la conducta meta final?',
                opciones: ['Analizar datos', 'Identificar patrones', 'Ajustar parámetros', 'Optimizar'],
                correcta: 3,
                explicacion: '¡Exacto! La optimización es el objetivo final.'
            },
            {
                meta: 'Que el sistema aprenda 500 patrones',
                pasos: ['Aprender 50 patrones', 'Aprender 150 patrones', 'Aprender 300 patrones', 'Aprender 500 patrones'],
                pregunta: '¿Qué refuerzas después de "aprender 150 patrones"?',
                opciones: ['Aprender 500 patrones', 'Aprender 50 patrones', 'Aprender 300 patrones', 'Nada'],
                correcta: 2,
                explicacion: '¡Correcto! Se refuerza la siguiente aproximación.'
            },
            {
                meta: 'Que la red neuronal clasifique correctamente',
                pasos: ['Recibir input', 'Procesar capa 1', 'Procesar capa 2', 'Clasificar'],
                pregunta: '¿Qué paso refuerzas primero?',
                opciones: ['Clasificar', 'Recibir input', 'Procesar capa 1', 'Procesar capa 2'],
                correcta: 1,
                explicacion: '¡Bien! Se empieza por el primer paso.'
            }
        ]
    }
};

// ========================================
// VARIABLES DE ESTADO POR NIVEL
// ========================================
let estadoNivel1 = { preguntaActual: 0, aciertos: 0, puntos: 0 };
let estadoNivel2 = { preguntaActual: 0, aciertos: 0, puntos: 0, posicionAuto: 20, probabilidadConducta: 0 };
let estadoNivel3 = { preguntaActual: 0, aciertos: 0, puntos: 0 };
let estadoNivel4 = { tareaActual: 0, aciertos: 0, puntos: 0 };

// ========================================
// INICIALIZACIÓN
// ========================================
window.onload = function() {
    console.log('🎮 Iniciando juego...');
    const sesion = localStorage.getItem('laboratorio_conductual_session');
    if (!sesion) {
        console.log('❌ No hay sesión activa, redirigiendo a login');
        window.location.href = 'index.html';
        return;
    }
    
    usuarioActual = JSON.parse(sesion);
    console.log('✅ Usuario cargado:', usuarioActual.usuario);
    console.log('🎭 Personaje seleccionado:', usuarioActual.progreso.personaje);
    
    document.getElementById('player-name').textContent = usuarioActual.usuario;
    document.getElementById('player-points').textContent = usuarioActual.progreso.puntos;
    
    if (usuarioActual.progreso.personaje) {
        console.log('✅ Usuario ya tiene personaje, mostrando mapa');
        actualizarMapa();
        mostrarPantalla('screen-map');
    } else {
        console.log('⚠️ Usuario sin personaje, mostrando selector');
        mostrarPantalla('screen-characters');
    }
};

// ========================================
// NAVEGACIÓN
// ========================================
function mostrarPantalla(pantallaId) {
    console.log('🖼️ Mostrando pantalla:', pantallaId);
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    const pantalla = document.getElementById(pantallaId);
    if (pantalla) {
        pantalla.classList.add('active');
        pantalla.style.display = 'block';
        console.log('✅ Pantalla mostrada:', pantallaId);
    } else {
        console.error('❌ Pantalla no encontrada:', pantallaId);
    }
}

function mostrarSelectorPersonajes() {
    mostrarPantalla('screen-characters');
}

function mostrarMapa() {
    mostrarPantalla('screen-map');
    actualizarMapa();
}

function volverAlMapa() {
    // Detener animación del nivel 2
    animacionActiva = false;
    actualizarMapa();
    mostrarMapa();
}

// ========================================
// PERSONAJES
// ========================================
const personajes = {
    cientifico: { nombre: 'El Científico', emoji: '👨‍🔬' },
    detective: { nombre: 'El Detective', emoji: '🕵️' },
    entrenador: { nombre: 'El Entrenador', emoji: '🎯' },
    robot: { nombre: 'El Robot', emoji: '🤖' }
};

function seleccionarPersonaje(personajeId) {
    console.log('🎭 Personaje seleccionado:', personajeId);
    if (!personajes[personajeId]) {
        console.error('Personaje no válido');
        return;
    }
    
    const personaje = personajes[personajeId];
    usuarioActual.progreso.personaje = personajeId;
    actualizarUsuarioBD();
    
    console.log('✅ Personaje guardado:', personaje.nombre);
    
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
    });
    
    const selectedCard = event.target.closest('.character-card');
    if (selectedCard) {
        selectedCard.style.opacity = '1';
        selectedCard.style.transform = 'scale(1.1)';
        selectedCard.style.borderColor = '#00ff88';
        selectedCard.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
    }
    
    const mensaje = document.createElement('div');
    mensaje.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 136, 0.95);
            color: #1a1a2e;
            padding: 30px 50px;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: popIn 0.3s;
        ">
            ✅ ¡${personaje.nombre} Seleccionado!<br>
            <small style="font-size: 1rem;">Cargando mapa...</small>
        </div>
    `;
    document.body.appendChild(mensaje);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        mensaje.remove();
        mostrarMapa();
    }, 1500);
}

// ========================================
// MAPA DE NIVELES
// ========================================
function actualizarMapa() {
    console.log('🔄 Actualizando mapa...');
    console.log('Nivel desbloqueado actual:', usuarioActual.progreso.nivel);
    
    const nivelDesbloqueado = usuarioActual.progreso.nivel || 1;
    
    for (let i = 1; i <= 4; i++) {
        const levelCard = document.getElementById(`level-${i}`);
        if (!levelCard) continue;
        
        if (i <= nivelDesbloqueado) {
            levelCard.classList.remove('locked');
            levelCard.style.cursor = 'pointer';
            levelCard.style.opacity = '1';
            
            const overlay = levelCard.querySelector('.lock-overlay');
            if (overlay) {
                overlay.remove();
                console.log(`  ✅ Nivel ${i} desbloqueado`);
            }
        } else {
            levelCard.classList.add('locked');
            levelCard.style.cursor = 'not-allowed';
            levelCard.style.opacity = '0.5';
            
            if (!levelCard.querySelector('.lock-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'lock-overlay';
                overlay.textContent = '🔒 Bloqueado';
                overlay.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.9);
                    padding: 15px 25px;
                    border-radius: 10px;
                    font-weight: bold;
                    color: #fff;
                    font-size: 1.1rem;
                `;
                levelCard.appendChild(overlay);
                console.log(`  🔒 Nivel ${i} bloqueado`);
            }
        }
    }
}

function iniciarNivel(nivel) {
    console.log('🎮 Intentando iniciar nivel:', nivel);
    console.log('Nivel actual del usuario:', usuarioActual.progreso.nivel);
    
    const nivelDesbloqueado = usuarioActual.progreso.nivel || 1;
    
    if (nivel > nivelDesbloqueado) {
        alert(`🔒 Este nivel está bloqueado. Completa el nivel ${nivelDesbloqueado} primero.`);
        return;
    }
    
    console.log('✅ Iniciando nivel:', nivel);
    nivelActual = nivel;
    tiempoInicio = Date.now();
    
    if (nivel === 1) iniciarNivel1();
    else if (nivel === 2) iniciarNivel2();
    else if (nivel === 3) iniciarNivel3();
    else if (nivel === 4) iniciarNivel4();
}

// ========================================
// CARGAR PREGUNTAS PERSONALIZADAS
// ========================================
function cargarPreguntasPersonalizadas(nivel) {
    const personaje = usuarioActual.progreso.personaje;
    if (!personaje || !preguntasPorAvatar[personaje]) {
        return obtenerPreguntasPorDefecto(nivel);
    }
    
    const avatarData = preguntasPorAvatar[personaje];
    
    switch(nivel) {
        case 1: return avatarData.nivel1 || [];
        case 2: return avatarData.nivel2 || [];
        case 3: return avatarData.nivel3 || [];
        case 4: return avatarData.nivel4 || [];
        default: return [];
    }
}

function obtenerPreguntasPorDefecto(nivel) {
    if (nivel === 1) return nivel1Datos.preguntas;
    if (nivel === 2) return nivel2Datos.preguntas;
    if (nivel === 3) return nivel3Datos.preguntas;
    if (nivel === 4) return nivel4Datos.tareas;
    return [];
}

// ========================================
// NIVEL 1: IDENTIFICACIÓN
// ========================================
function iniciarNivel1() {
    estadoNivel1 = { preguntaActual: 0, aciertos: 0, puntos: 0 };
    const preguntas = cargarPreguntasPersonalizadas(1);
    document.getElementById('l1-total').textContent = preguntas.length;
    mostrarPantalla('screen-level1');
    cargarPreguntaNivel1();
}

function cargarPreguntaNivel1() {
    const preguntas = cargarPreguntasPersonalizadas(1);
    if (estadoNivel1.preguntaActual >= preguntas.length) {
        finalizarNivel(1);
        return;
    }
    
    const pregunta = preguntas[estadoNivel1.preguntaActual];
    document.getElementById('l1-current').textContent = estadoNivel1.preguntaActual + 1;
    document.getElementById('l1-emoji').textContent = pregunta.emoji;
    document.getElementById('l1-scenario').textContent = pregunta.escenario;
    document.getElementById('l1-feedback').textContent = '';
    
    const optionsContainer = document.getElementById('l1-options');
    optionsContainer.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarRespuestaNivel1(index);
        optionsContainer.appendChild(btn);
    });
}

function verificarRespuestaNivel1(seleccionada) {
    const preguntas = cargarPreguntasPersonalizadas(1);
    const pregunta = preguntas[estadoNivel1.preguntaActual];
    const feedback = document.getElementById('l1-feedback');
    const esCorrecta = seleccionada === pregunta.correcta;
    
    document.querySelectorAll('#l1-options .option-btn').forEach(btn => btn.disabled = true);
    
    if (esCorrecta) {
        estadoNivel1.aciertos++;
        estadoNivel1.puntos += 20;
        feedback.textContent = '✅ ' + pregunta.explicacion;
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '❌ ' + pregunta.explicacion;
        feedback.className = 'feedback incorrect';
    }
    
    estadoNivel1.preguntaActual++;
    
    setTimeout(() => {
        cargarPreguntaNivel1();
    }, 2000);
}

// ========================================
// NIVEL 2: CAMINO CON AUTO AVANZADO (CANVAS)
// ========================================
function iniciarNivel2() {
    estadoNivel2 = { preguntaActual: 0, aciertos: 0, puntos: 0, posicionAuto: 20, probabilidadConducta: 0 };
    document.getElementById('l2-total').textContent = cargarPreguntasPersonalizadas(2).length;
    
    // Inicializar canvas
    canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }
    
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Resetear auto
    auto = {
        x: 50,
        y: canvas.height - 100,
        velocidad: 0,
        angulo: 0,
        color: '#FFD700'
    };
    
    // Crear camino
    crearCamino();
    
    // Meta al final
    meta = { x: canvas.width - 100, y: canvas.height - 150 };
    
    distanciaTotal = canvas.width - 150;
    distanciaActual = 0;
    
    mostrarPantalla('screen-level2');
    cargarPreguntaNivel2();
    
    // Iniciar animación
    if (!animacionActiva) {
        animacionActiva = true;
        animarNivel2();
    }
}

function crearCamino() {
    camino = [];
    obstaculos = [];
    
    // Crear segmentos de camino
    let x = 0;
    let y = canvas.height - 100;
    let ancho = 120;
    
    for (let i = 0; i < 20; i++) {
        camino.push({
            x: x,
            y: y,
            ancho: ancho,
            alto: 20
        });
        
        // Agregar rampas aleatorias
        if (i > 3 && Math.random() > 0.6) {
            camino.push({
                x: x + 50,
                y: y - 30,
                ancho: 60,
                alto: 10,
                esRampa: true
            });
        }
        
        // Agregar obstáculos
        if (i > 5 && Math.random() > 0.7) {
            obstaculos.push({
                x: x + Math.random() * 80,
                y: y - 20,
                tipo: Math.random() > 0.5 ? 'cono' : 'roca'
            });
        }
        
        x += 80;
    }
}

function animarNivel2() {
    if (!animacionActiva || !ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar cielo
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#E0F6FF');
    gradient.addColorStop(0.5, '#90EE90');
    gradient.addColorStop(1, '#228B22');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar camino
    camino.forEach(segmento => {
        if (segmento.esRampa) {
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(segmento.x, segmento.y + segmento.alto);
            ctx.lineTo(segmento.x + segmento.ancho, segmento.y);
            ctx.lineTo(segmento.x + segmento.ancho, segmento.y + segmento.alto);
            ctx.closePath();
            ctx.fill();
            
            // Barandilla
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(segmento.x, segmento.y);
            ctx.lineTo(segmento.x + segmento.ancho, segmento.y - 10);
            ctx.stroke();
        } else {
            ctx.fillStyle = '#696969';
            ctx.fillRect(segmento.x, segmento.y, segmento.ancho, segmento.alto);
            
            // Líneas del camino
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.setLineDash([20, 10]);
            ctx.beginPath();
            ctx.moveTo(segmento.x, segmento.y + segmento.alto/2);
            ctx.lineTo(segmento.x + segmento.ancho, segmento.y + segmento.alto/2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    });
    
    // Dibujar obstáculos
    obstaculos.forEach(obstaculo => {
        if (obstaculo.tipo === 'cono') {
            ctx.fillStyle = '#FF6347';
            ctx.beginPath();
            ctx.moveTo(obstaculo.x, obstaculo.y + 20);
            ctx.lineTo(obstaculo.x + 10, obstaculo.y);
            ctx.lineTo(obstaculo.x + 20, obstaculo.y + 20);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.arc(obstaculo.x + 10, obstaculo.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    // Dibujar meta
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(meta.x, meta.y - 50, 10, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(meta.x + 10, meta.y - 50, 10, 100);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(meta.x + 20, meta.y - 50, 10, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(meta.x + 30, meta.y - 50, 10, 100);
    
    // Dibujar auto (estilo monster truck)
    ctx.save();
    ctx.translate(auto.x, auto.y);
    ctx.rotate(auto.angulo);
    
    // Cuerpo del auto
    ctx.fillStyle = auto.color;
    ctx.fillRect(-30, -15, 60, 30);
    
    // Cabina
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(-15, -30, 30, 20);
    
    // Ruedas grandes (monster truck)
    ctx.fillStyle = '#2F4F4F';
    ctx.beginPath();
    ctx.arc(-25, 15, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(25, 15, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Detalles de ruedas
    ctx.strokeStyle = '#696969';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-25, 15, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(25, 15, 6, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
    
    // Actualizar métricas
    document.getElementById('distance').textContent = Math.floor(distanciaActual);
    document.getElementById('speed').textContent = Math.floor(auto.velocidad * 10);
    
    requestAnimationFrame(animarNivel2);
}

function cargarPreguntaNivel2() {
    const preguntas = cargarPreguntasPersonalizadas(2);
    if (estadoNivel2.preguntaActual >= preguntas.length) {
        finalizarNivel(2);
        return;
    }
    
    const pregunta = preguntas[estadoNivel2.preguntaActual];
    document.getElementById('l2-current').textContent = estadoNivel2.preguntaActual + 1;
    document.getElementById('l2-scenario').textContent = pregunta.escenario;
    document.getElementById('l2-feedback').textContent = '';
    
    const optionsContainer = document.getElementById('l2-options');
    optionsContainer.innerHTML = '';
    
    const opciones = [
        { texto: 'Refuerzo Positivo', tipo: 'positivo' },
        { texto: 'Refuerzo Negativo', tipo: 'negativo' },
        { texto: 'Castigo', tipo: 'castigo' },
        { texto: 'Extinción', tipo: 'extincion' }
    ];
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion.texto;
        btn.onclick = () => verificarRespuestaNivel2(opcion.tipo);
        optionsContainer.appendChild(btn);
    });
}

function verificarRespuestaNivel2(tipo) {
    const preguntas = cargarPreguntasPersonalizadas(2);
    const pregunta = preguntas[estadoNivel2.preguntaActual];
    const feedback = document.getElementById('l2-feedback');
    const esCorrecta = tipo === pregunta.correcta;
    
    document.querySelectorAll('#l2-options .option-btn').forEach(btn => btn.disabled = true);
    
    if (esCorrecta) {
        estadoNivel2.aciertos++;
        estadoNivel2.puntos += 20;
        estadoNivel2.posicionAuto = Math.min(85, estadoNivel2.posicionAuto + 15);
        estadoNivel2.probabilidadConducta = Math.min(100, estadoNivel2.probabilidadConducta + 20);
        
        // Acelerar auto
        auto.velocidad = 5;
        distanciaActual += 50;
        
        // Mover auto visualmente
        auto.x += 100;
        if (auto.x > canvas.width - 100) auto.x = canvas.width - 100;
        
        feedback.textContent = '✅ ' + pregunta.explicacion;
        feedback.className = 'feedback correct';
    } else {
        estadoNivel2.posicionAuto = Math.max(20, estadoNivel2.posicionAuto - 5);
        estadoNivel2.probabilidadConducta = Math.max(0, estadoNivel2.probabilidadConducta - 10);
        
        // Frenar auto
        auto.velocidad = 0;
        
        feedback.textContent = '❌ ' + pregunta.explicacion;
        feedback.className = 'feedback incorrect';
    }
    
    document.getElementById('player-car').style.left = estadoNivel2.posicionAuto + '%';
    document.getElementById('l2-behavior-bar').style.width = estadoNivel2.probabilidadConducta + '%';
    document.getElementById('l2-behavior-percent').textContent = estadoNivel2.probabilidadConducta + '%';
    
    estadoNivel2.preguntaActual++;
    
    setTimeout(() => {
        cargarPreguntaNivel2();
    }, 2000);
}

// ========================================
// NIVEL 3: PROGRAMAS DE REFORZAMIENTO
// ========================================
function iniciarNivel3() {
    estadoNivel3 = { preguntaActual: 0, aciertos: 0, puntos: 0 };
    document.getElementById('l3-total').textContent = cargarPreguntasPersonalizadas(3).length;
    mostrarPantalla('screen-level3');
    cargarPreguntaNivel3();
}

function cargarPreguntaNivel3() {
    const preguntas = cargarPreguntasPersonalizadas(3);
    if (estadoNivel3.preguntaActual >= preguntas.length) {
        finalizarNivel(3);
        return;
    }
    
    const pregunta = preguntas[estadoNivel3.preguntaActual];
    document.getElementById('l3-current').textContent = estadoNivel3.preguntaActual + 1;
    document.getElementById('l3-program-name').textContent = pregunta.programa;
    document.getElementById('l3-program-desc').textContent = pregunta.descripcion;
    document.getElementById('l3-question').textContent = pregunta.pregunta;
    document.getElementById('l3-feedback').textContent = '';
    
    const graphContainer = document.getElementById('l3-graph');
    graphContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.className = 'graph-bar';
        bar.style.height = Math.random() * 80 + 20 + '%';
        graphContainer.appendChild(bar);
    }
    
    const optionsContainer = document.getElementById('l3-options');
    optionsContainer.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarRespuestaNivel3(index);
        optionsContainer.appendChild(btn);
    });
}

function verificarRespuestaNivel3(seleccionada) {
    const preguntas = cargarPreguntasPersonalizadas(3);
    const pregunta = preguntas[estadoNivel3.preguntaActual];
    const feedback = document.getElementById('l3-feedback');
    const esCorrecta = seleccionada === pregunta.correcta;
    
    document.querySelectorAll('#l3-options .option-btn').forEach(btn => btn.disabled = true);
    
    if (esCorrecta) {
        estadoNivel3.aciertos++;
        estadoNivel3.puntos += 25;
        feedback.textContent = '✅ ' + pregunta.explicacion;
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '❌ ' + pregunta.explicacion;
        feedback.className = 'feedback incorrect';
    }
    
    estadoNivel3.preguntaActual++;
    
    setTimeout(() => {
        cargarPreguntaNivel3();
    }, 2000);
}

// ========================================
// NIVEL 4: MOLDEAMIENTO
// ========================================
function iniciarNivel4() {
    estadoNivel4 = { tareaActual: 0, aciertos: 0, puntos: 0 };
    document.getElementById('l4-total').textContent = cargarPreguntasPersonalizadas(4).length;
    mostrarPantalla('screen-level4');
    cargarTareaNivel4();
}

function cargarTareaNivel4() {
    const tareas = cargarPreguntasPersonalizadas(4);
    if (estadoNivel4.tareaActual >= tareas.length) {
        finalizarNivel(4);
        return;
    }
    
    const tarea = tareas[estadoNivel4.tareaActual];
    document.getElementById('l4-current').textContent = estadoNivel4.tareaActual + 1;
    document.getElementById('l4-target').textContent = tarea.meta;
    document.getElementById('l4-question').textContent = tarea.pregunta;
    document.getElementById('l4-feedback').textContent = '';
    
    for (let i = 1; i <= 5; i++) {
        const step = document.getElementById(`step-${i}`);
        if (step) {
            step.className = 'step';
            if (i <= estadoNivel4.tareaActual) step.classList.add('completed');
            if (i === estadoNivel4.tareaActual + 1) step.classList.add('current');
        }
    }
    
    const optionsContainer = document.getElementById('l4-options');
    optionsContainer.innerHTML = '';
    
    tarea.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarRespuestaNivel4(index);
        optionsContainer.appendChild(btn);
    });
}

function verificarRespuestaNivel4(seleccionada) {
    const tareas = cargarPreguntasPersonalizadas(4);
    const tarea = tareas[estadoNivel4.tareaActual];
    const feedback = document.getElementById('l4-feedback');
    const esCorrecta = seleccionada === tarea.correcta;
    
    document.querySelectorAll('#l4-options .option-btn').forEach(btn => btn.disabled = true);
    
    if (esCorrecta) {
        estadoNivel4.aciertos++;
        estadoNivel4.puntos += 30;
        feedback.textContent = '✅ ' + tarea.explicacion;
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '❌ ' + tarea.explicacion;
        feedback.className = 'feedback incorrect';
    }
    
    estadoNivel4.tareaActual++;
    
    setTimeout(() => {
        cargarTareaNivel4();
    }, 2000);
}

// ========================================
// FINALIZAR NIVEL
// ========================================
function finalizarNivel(nivel) {
    // Detener animación del nivel 2
    if (nivel === 2) {
        animacionActiva = false;
    }
    
    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    let aciertos, total, puntos;
    
    if (nivel === 1) {
        aciertos = estadoNivel1.aciertos;
        total = cargarPreguntasPersonalizadas(1).length;
        puntos = estadoNivel1.puntos;
    } else if (nivel === 2) {
        aciertos = estadoNivel2.aciertos;
        total = cargarPreguntasPersonalizadas(2).length;
        puntos = estadoNivel2.puntos;
    } else if (nivel === 3) {
        aciertos = estadoNivel3.aciertos;
        total = cargarPreguntasPersonalizadas(3).length;
        puntos = estadoNivel3.puntos;
    } else {
        aciertos = estadoNivel4.aciertos;
        total = cargarPreguntasPersonalizadas(4).length;
        puntos = estadoNivel4.puntos;
    }
    
    const precision = Math.round((aciertos / total) * 100);
    
    document.getElementById('result-title').textContent = precision >= 70 ? '🎉 ¡Nivel Completado!' : '💪 Sigue Practicando';
    document.getElementById('result-emoji').textContent = precision >= 70 ? '🎉' : '💪';
    document.getElementById('result-points').textContent = puntos;
    document.getElementById('result-accuracy').textContent = precision + '%';
    document.getElementById('result-time').textContent = `${Math.floor(tiempoTranscurrido/60)}:${(tiempoTranscurrido%60).toString().padStart(2,'0')}`;
    
    if (precision >= 70) {
        usuarioActual.progreso.puntos += puntos;
        usuarioActual.progreso[`nivel${nivel}Completado`] = true;
        
        const siguienteNivel = nivel + 1;
        if (siguienteNivel <= 4 && siguienteNivel > usuarioActual.progreso.nivel) {
            usuarioActual.progreso.nivel = siguienteNivel;
            console.log(`✅ Nivel ${nivel} completado. Desbloqueando nivel ${siguienteNivel}`);
        }
        
        actualizarUsuarioBD();
        usuarioActual = JSON.parse(localStorage.getItem('laboratorio_conductual_session'));
    }
    
    console.log('Progreso actual:', usuarioActual.progreso);
    mostrarPantalla('screen-results');
}

// ========================================
// BASE DE DATOS
// ========================================
function actualizarUsuarioBD() {
    console.log('💾 Guardando usuario en BD...');
    const usuarios = JSON.parse(localStorage.getItem('laboratorio_conductual_users')) || [];
    const index = usuarios.findIndex(u => u.id === usuarioActual.id);
    
    if (index !== -1) {
        usuarios[index] = usuarioActual;
        localStorage.setItem('laboratorio_conductual_users', JSON.stringify(usuarios));
        localStorage.setItem('laboratorio_conductual_session', JSON.stringify(usuarioActual));
        console.log('✅ Usuario guardado correctamente');
        console.log('Progreso guardado:', usuarioActual.progreso);
    } else {
        console.error('❌ Usuario no encontrado en BD');
    }
}

function cerrarSesion() {
    animacionActiva = false;
    localStorage.removeItem('laboratorio_conductual_session');
    window.location.href = 'index.html';
}

// ========================================
// CAMBIAR AVATAR
// ========================================
function cambiarAvatar() {
    console.log('🎭 Botón cambiar avatar presionado');
    const modal = document.getElementById('confirm-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        console.log('✅ Modal mostrado');
    } else {
        console.error('❌ Modal no encontrado en el DOM');
        crearModalDinamico();
    }
}

function confirmarCambioAvatar() {
    console.log('✅ Usuario confirmó cambio de avatar');
    if (usuarioActual && usuarioActual.progreso) {
        usuarioActual.progreso.personaje = null;
        console.log('🔄 Personaje eliminado:', usuarioActual.progreso.personaje);
        actualizarUsuarioBD();
    }
    
    const modal = document.getElementById('confirm-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    
    mostrarPantalla('screen-characters');
    
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.borderColor = '';
        card.style.boxShadow = '';
    });
    
    console.log('🎮 Volviendo al selector de personajes');
}

function cancelarCambioAvatar() {
    console.log('❌ Usuario canceló cambio de avatar');
    const modal = document.getElementById('confirm-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

function crearModalDinamico() {
    console.log('🔨 Creando modal dinámicamente...');
    const modalHTML = `
        <div id="confirm-modal" class="confirm-modal active">
            <div class="confirm-content">
                <h3>🎭 ¿Cambiar Avatar?</h3>
                <p>Si cambias de avatar, tu personaje actual será reemplazado. ¿Deseas continuar?</p>
                <div class="confirm-buttons">
                    <button class="btn-confirm yes" onclick="confirmarCambioAvatar()">✅ Sí, cambiar</button>
                    <button class="btn-confirm no" onclick="cancelarCambioAvatar()">❌ Cancelar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('✅ Modal creado');
}

document.addEventListener('click', function(event) {
    const modal = document.getElementById('confirm-modal');
    if (modal && event.target === modal) {
        cancelarCambioAvatar();
    }
});

// ========================================
// DEBUG - RESET PROGRESO
// ========================================
function resetearProgreso() {
    if (confirm('⚠️ ¿Estás seguro de resetear TODO tu progreso? Esta acción no se puede deshacer.')) {
        usuarioActual.progreso = {
            nivel: 1,
            puntos: 0,
            personaje: null,
            nivelesCompletados: [],
            nivel1Completado: false,
            nivel2Completado: false,
            nivel3Completado: false,
            nivel4Completado: false
        };
        actualizarUsuarioBD();
        cerrarSesion();
        console.log('✅ Progreso reseteado');
    }
}

// Ajustar canvas al redimensionar
window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});