// Sistema de Personajes

const characters = {
    scientist: {
        name: 'El Científico',
        emoji: '👨‍🔬',
        intelligence: 3,
        speed: 2,
        bonus: 'Puntos extra en preguntas teóricas'
    },
    detective: {
        name: 'El Detective',
        emoji: '🕵️',
        intelligence: 2,
        speed: 3,
        bonus: 'Tiempo extra en niveles cronometrados'
    },
    trainer: {
        name: 'El Entrenador',
        emoji: '🎯',
        intelligence: 2,
        speed: 2,
        bonus: 'Refuerzos más efectivos'
    },
    robot: {
        name: 'El Robot',
        emoji: '🤖',
        intelligence: 3,
        speed: 1,
        bonus: 'Análisis automático de patrones'
    }
};

function selectCharacter(characterId) {
    if (!auth.currentUser) return;
    
    // Guardar personaje seleccionado
    auth.currentUser.progress.character = characterId;
    auth.saveProgress();
    
    // Animación de selección
    event.target.closest('.character-card').style.transform = 'scale(1.1)';
    event.target.closest('.character-card').style.borderColor = '#00ff88';
    
    setTimeout(() => {
        document.getElementById('character-selector').classList.remove('active');
        document.getElementById('level-map').classList.add('active');
        updatePlayerInfo();
        loadLevelProgress();
    }, 500);
}

function getCharacterData() {
    if (!auth.currentUser?.progress?.character) return null;
    return characters[auth.currentUser.progress.character];
}

function applyCharacterBonus(basePoints, level) {
    const char = getCharacterData();
    if (!char) return basePoints;
    
    // Aplicar bonificación según personaje
    if (char.intelligence >= 3 && level === 1) {
        return basePoints + 5; // Bonus teórico
    }
    
    return basePoints;
}