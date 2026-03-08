// Configuración de los 4 Niveles del Juego

const levelsConfig = {
    1: {
        title: 'Identificación de Conductas',
        description: 'Reconoce las consecuencias conductuales',
        icon: '📚',
        questions: [
            {
                scenario: 'Un estudiante recibe un elogio después de estudiar',
                question: '¿Qué tipo de consecuencia es esta?',
                options: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correct: 0,
                feedback: '¡Correcto! El elogio es un estímulo agradable que aumenta la probabilidad de estudiar.'
            },
            {
                scenario: 'Se elimina el ruido molesto cuando el alumno se concentra',
                question: '¿Qué principio se aplica?',
                options: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correct: 1,
                feedback: '¡Exacto! Eliminar un estímulo desagradable es Refuerzo Negativo.'
            },
            {
                scenario: 'Un niño pierde privilegios por portarse mal',
                question: '¿Qué consecuencia es esta?',
                options: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correct: 2,
                feedback: 'Correcto. La pérdida de privilegios disminuye la conducta no deseada.'
            },
            {
                scenario: 'Dejas de prestar atención a las berrinches',
                question: '¿Qué estás aplicando?',
                options: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correct: 3,
                feedback: '¡Bien! Al no reforzar la conducta, esta disminuye (Extinción).'
            },
            {
                scenario: 'Recibes puntos extra por completar tareas',
                question: '¿Qué tipo de refuerzo es?',
                options: ['Refuerzo Positivo', 'Refuerzo Negativo', 'Castigo', 'Extinción'],
                correct: 0,
                feedback: '¡Correcto! Los puntos son un estímulo agradable agregado.'
            }
        ],
        pointsPerQuestion: 20,
        unlockRequirement: 0
    },
    
    2: {
        title: 'Aplicación de Refuerzos',
        description: 'Aplica refuerzos correctamente',
        icon: '🎯',
        scenarios: [
            {
                goal: 'Que el avatar estudie más',
                options: [
                    { text: 'Dar elogio después de estudiar', type: 'refuerzo_positivo' },
                    { text: 'Quitar tarea extra si estudia', type: 'refuerzo_negativo' },
                    { text: 'Ignorar cuando estudia', type: 'extincion' },
                    { text: 'Regañar cuando no estudia', type: 'castigo' }
                ],
                correct: [0, 1],
                feedback: 'Ambos refuerzos aumentan la conducta de estudiar.'
            },
            {
                goal: 'Reducir las interrupciones en clase',
                options: [
                    { text: 'Elogiar cuando levanta la mano', type: 'refuerzo_positivo' },
                    { text: 'Ignorar las interrupciones', type: 'extincion' },
                    { text: 'Dar premio por interrumpir', type: 'refuerzo_positivo' },
                    { text: 'Tiempo fuera por interrumpir', type: 'castigo' }
                ],
                correct: [0, 1, 3],
                feedback: 'Correcto. Refuerzas la conducta alternativa y aplicas consecuencias a la no deseada.'
            },
            {
                goal: 'Aumentar la puntualidad',
                options: [
                    { text: 'Reconocimiento público por llegar a tiempo', type: 'refuerzo_positivo' },
                    { text: 'Eliminar reunión extra si es puntual', type: 'refuerzo_negativo' },
                    { text: 'No hacer nada', type: 'extincion' },
                    { text: 'Multar por llegar tarde', type: 'castigo' }
                ],
                correct: [0, 1, 3],
                feedback: '¡Excelente! Combinas refuerzos y castigos efectivamente.'
            }
        ],
        pointsPerScenario: 30,
        unlockRequirement: 1
    },
    
    3: {
        title: 'Programas de Reforzamiento',
        description: 'Domina los programas de reforzamiento',
        icon: '📊',
        programs: [
            {
                name: 'Razón Fija',
                description: 'Refuerzo después de un número fijo de respuestas',
                example: 'Cada 5 respuestas correctas = 1 punto',
                question: '¿Qué programa es este: premio cada 3 tareas completadas?',
                options: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correct: 0
            },
            {
                name: 'Razón Variable',
                description: 'Refuerzo después de un número variable de respuestas',
                example: 'Premio aleatorio después de 2-5 respuestas',
                question: '¿Qué programa mantiene la conducta por más tiempo?',
                options: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correct: 1
            },
            {
                name: 'Intervalo Fijo',
                description: 'Refuerzo después de un tiempo fijo',
                example: 'Revisión cada 30 minutos',
                question: '¿Qué programa es: examen cada semana?',
                options: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correct: 2
            },
            {
                name: 'Intervalo Variable',
                description: 'Refuerzo después de tiempo variable',
                example: 'Pop quizzes aleatorios',
                question: '¿Qué programa genera respuesta constante?',
                options: ['Razón Fija', 'Razón Variable', 'Intervalo Fijo', 'Intervalo Variable'],
                correct: 3
            }
        ],
        pointsPerQuestion: 25,
        unlockRequirement: 2
    },
    
    4: {
        title: 'Moldeamiento Conductual',
        description: 'Logra la conducta meta',
        icon: '🏆',
        shapingTasks: [
            {
                finalBehavior: 'Que el estudiante lea 30 minutos diarios',
                steps: [
                    { step: 'Que tome el libro', reinforce: true },
                    { step: 'Que abra el libro', reinforce: true },
                    { step: 'Que lea 5 minutos', reinforce: true },
                    { step: 'Que lea 15 minutos', reinforce: true },
                    { step: 'Que lea 30 minutos', reinforce: true }
                ],
                question: '¿Qué aproximación debes reforzar primero?',
                options: ['Leer 30 minutos', 'Tomar el libro', 'Leer 15 minutos', 'Abrir el libro'],
                correct: 1
            },
            {
                finalBehavior: 'Que el alumno participe en clase',
                steps: [
                    { step: 'Que levante la mano', reinforce: true },
                    { step: 'Que responda cuando se le pregunta', reinforce: true },
                    { step: 'Que participe voluntariamente', reinforce: true }
                ],
                question: '¿Cuál es la conducta meta final?',
                options: ['Levantar la mano', 'Responder cuando preguntan', 'Participar voluntariamente', 'Escuchar en clase'],
                correct: 2
            },
            {
                finalBehavior: 'Que el niño ordene su habitación',
                steps: [
                    { step: 'Que recoja un juguete', reinforce: true },
                    { step: 'Que recoja todos los juguetes', reinforce: true },
                    { step: 'Que haga la cama', reinforce: true },
                    { step: 'Que ordene todo el cuarto', reinforce: true }
                ],
                question: 'Si refuerzas solo el paso final, ¿qué pasa?',
                options: ['Aprende más rápido', 'Se frustra y abandona', 'No hay diferencia', 'Aprende mejor'],
                correct: 1
            }
        ],
        pointsPerTask: 40,
        unlockRequirement: 3
    }
};

function getLevelConfig(level) {
    return levelsConfig[level];
}

function canUnlockLevel(currentLevel, targetLevel) {
    return currentLevel >= levelsConfig[targetLevel].unlockRequirement;
}