// ========================================
// SISTEMA DE AUTENTICACIÓN - LABORATORIO CONDUCTUAL
// ========================================

const DB_KEY = 'laboratorio_conductual_users';
const SESSION_KEY = 'laboratorio_conductual_session';

// Inicializar base de datos
function inicializarBD() {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify([]));
        console.log('✅ Base de datos creada');
    }
}

// Obtener usuarios
function obtenerUsuarios() {
    const usuarios = localStorage.getItem(DB_KEY);
    return usuarios ? JSON.parse(usuarios) : [];
}

// Guardar usuarios
function guardarUsuarios(usuarios) {
    localStorage.setItem(DB_KEY, JSON.stringify(usuarios));
}

// ========================================
// CAMBIAR FORMULARIOS
// ========================================
function cambiarFormulario(tipo) {
    console.log('🔄 Cambiando a:', tipo);
    
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const btnLogin = document.getElementById('tab-login');
    const btnRegister = document.getElementById('tab-register');
    
    if (tipo === 'login') {
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
        btnLogin.classList.add('active');
        btnRegister.classList.remove('active');
    } else {
        formLogin.classList.remove('active');
        formRegister.classList.add('active');
        btnLogin.classList.remove('active');
        btnRegister.classList.add('active');
    }
    
    // Limpiar mensajes
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-error').textContent = '';
    document.getElementById('register-success').textContent = '';
}

// ========================================
// REGISTRO
// ========================================
function registrarUsuario(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('register-user').value.trim();
    const password = document.getElementById('register-pass').value;
    const confirm = document.getElementById('register-confirm').value;
    const errorEl = document.getElementById('register-error');
    const successEl = document.getElementById('register-success');
    
    console.log('📝 Registrando usuario:', usuario);
    
    // Validaciones
    if (password !== confirm) {
        errorEl.textContent = '❌ Las contraseñas no coinciden';
        successEl.textContent = '';
        return;
    }
    
    if (password.length < 6) {
        errorEl.textContent = '❌ La contraseña debe tener al menos 6 caracteres';
        successEl.textContent = '';
        return;
    }
    
    if (usuario.length < 3) {
        errorEl.textContent = '❌ El usuario debe tener al menos 3 caracteres';
        successEl.textContent = '';
        return;
    }
    
    const usuarios = obtenerUsuarios();
    
    // Verificar si existe
    const existe = usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());
    if (existe) {
        errorEl.textContent = '❌ El usuario ya existe';
        successEl.textContent = '';
        return;
    }
    
    // Crear usuario
    const nuevoUsuario = {
        id: Date.now(),
        usuario: usuario,
        password: password,
        fechaRegistro: new Date().toISOString(),
        progreso: {
            nivel: 1,
            puntos: 0,
            personaje: null,
            nivelesCompletados: [],
            nivel1Completado: false,
            nivel2Completado: false,
            nivel3Completado: false,
            nivel4Completado: false
        }
    };
    
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    
    console.log('✅ Usuario registrado:', nuevoUsuario);
    
    errorEl.textContent = '';
    successEl.textContent = '✅ ¡Registro exitoso! Ahora inicia sesión';
    
    // Limpiar formulario
    document.getElementById('register-user').value = '';
    document.getElementById('register-pass').value = '';
    document.getElementById('register-confirm').value = '';
    
    setTimeout(() => {
        cambiarFormulario('login');
        successEl.textContent = '';
    }, 2000);
}

// ========================================
// LOGIN
// ========================================
function iniciarSesion(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;
    const errorEl = document.getElementById('login-error');
    
    console.log('🔑 Intentando login:', usuario);
    
    const usuarios = obtenerUsuarios();
    console.log('📊 Usuarios en BD:', usuarios.length);
    
    const usuarioEncontrado = usuarios.find(u => 
        u.usuario.toLowerCase() === usuario.toLowerCase() && u.password === password
    );
    
    if (!usuarioEncontrado) {
        errorEl.textContent = '❌ Usuario o contraseña incorrectos. ¿Te registraste?';
        console.log('❌ Login fallido');
        return;
    }
    
    // Guardar sesión
    localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioEncontrado));
    
    console.log('✅ Login exitoso');
    
    // Redirigir al juego
    window.location.href = 'game.html';
}

// ========================================
// CERRAR SESIÓN
// ========================================
function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
}

// ========================================
// OBTENER USUARIO ACTUAL
// ========================================
function obtenerUsuarioActual() {
    const sesion = localStorage.getItem(SESSION_KEY);
    return sesion ? JSON.parse(sesion) : null;
}

// ========================================
// GUARDAR PROGRESO
// ========================================
function guardarProgreso(progreso) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) return false;
    
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === usuario.id);
    
    if (index !== -1) {
        usuarios[index].progreso = progreso;
        guardarUsuarios(usuarios);
        
        usuario.progreso = progreso;
        localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
        
        return true;
    }
    return false;
}

// ========================================
// INICIALIZAR
// ========================================
window.onload = function() {
    inicializarBD();
    console.log('🎮 Laboratorio Conductual - Sistema listo');
    
    // NO redirigir automáticamente - mostrar login siempre
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        console.log('✅ Sesión activa:', usuario.usuario);
        // Opcional: redirigir si ya hay sesión
        // window.location.href = 'game.html';
    }
};

// ========================================
// DEBUG
// ========================================
function verUsuarios() {
    const usuarios = obtenerUsuarios();
    console.log('=== USUARIOS ===');
    console.log('Total:', usuarios.length);
    usuarios.forEach((u, i) => {
        console.log(`${i+1}. ${u.usuario} - Nivel: ${u.progreso.nivel}`);
    });
    return usuarios;
}

function borrarTodo() {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(SESSION_KEY);
    console.log('🗑️ Base de datos borrada');
    location.reload();
}