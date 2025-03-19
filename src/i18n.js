// src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    register: {
      title: 'Registro',
      username: 'Usuario',
      password: 'Contraseña',
      name: 'Nombre',
      lastname: 'Apellidos',
      email: 'Correo',
      phone: 'Teléfono',
      birthdate: 'Fecha de Nacimiento',
      submit: 'REGISTRARME',
      login: 'INICIAR SESIÓN'
    },
    login: {
      title: 'Iniciar sesión',
      username: 'Usuario',
      password: 'Contraseña',
      button: 'INICIAR SESIÓN'
    },
    dashboard: {
      welcome: 'Bienvenido al Dashboard',
      centers: 'Centros',
      dates: 'Citas',
      profile: 'Perfil'
    },
    profile: {
      title: 'Perfil de Usuario',
      edit: 'Editar Datos',
      name: 'Nombre',
      lastname: 'Apellidos',
      email: 'Correo',
      phone: 'Teléfono',
      birthdate: 'Fecha de Nacimiento',
      username: 'Nombre de usuario',
      save: 'Guardar Cambios',
      back: 'Volver',
      fullConfirmMessage: '¿Confirmas estos cambios?\n\nSe han modificado los siguientes campos:\n- {fields}',
      confirmChangesTitle: 'Confirmar cambios',
      confirmButton: 'Sí, confirmar',
      cancelButton: 'Cancelar',
      updateSuccessTitle: "Perfil actualizado",
      updateSuccessText: "Tu perfil ha sido actualizado correctamente.",
      logout:'Cerrar Sesión',
      cancel:'Cancelar',
      confirm:'Si, cerrar sesion',
      logouttext:"Se cerrará tu sesión actual y serás redirigido al login.",
      titlelogout:'¿Quieres cerrar sesión?"'
    },
    citas: {
      titleCreate: 'Crear cita',
      centerLabel: 'Centro de Salud:',
      selectCenter: 'Selecciona un centro',
      dateLabel: 'Fecha:',
      hourLabel: 'Hora:',
      selectHour: 'Selecciona una hora',
      createBtn: 'Crear Cita',
      bookedHours: '(Ocupada)',
      citasDelDia: 'Citas del día seleccionado',
      misCitas: 'Mis citas',
      cancel: 'Cancelar',
      todasCitas: 'Todas las citas',
      todayAppointments:"CITAS NO DISPONIBLES",
      error: "Error",
      completeFields: "Por favor, completa todos los campos.",
      citaCreated: "Cita creada correctamente",
      citaNotAvailable: "La cita no está disponible.",
      citaCancelled: "Cita cancelada correctamente",
      success: "Éxito"
    },
    centros: {
      title: 'Nuestros Centros'
    }
  },
  en: {
    register: {
      title: 'Sign Up',
      username: 'Username',
      password: 'Password',
      name: 'First Name',
      lastname: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthdate: 'Birth Date',
      submit: 'SIGN UP',
      login: 'LOGIN'
    },
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      button: 'LOGIN'
    },
    dashboard: {
      welcome: 'Welcome to the Dashboard',
      centers: 'Centers',
      dates: 'Appointments',
      profile: 'Profile'
    },
    profile: {
      title: 'User Profile',
      edit: 'Edit Data',
      name: 'First Name',
      lastname: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthdate: 'Birth Date',
      username: 'Username',
      save: 'Save Changes',
      back: 'Go back',
      fullConfirmMessage: 'Do you confirm these changes?\n\nThe following fields have been modified:\n- {fields}',
      confirmChangesTitle: 'Confirm changes',
      confirmButton: 'Yes, confirm',
      cancelButton: 'Cancel',
      updateSuccessTitle: "Profile updated",
      updateSuccessText: "Your profile has been updated successfully.",
      logout:'Logout',
      cancel:'Cancel',
      confirm:'Yes, log out',
      logouttext:"Your current session will be closed and you'll be redirected to the login page.",
      titlelogout:'Do you want to log out?'
    },
    citas: {
      titleCreate: 'Create Appointment',
      centerLabel: 'Health Center:',
      selectCenter: 'Select a center',
      dateLabel: 'Date:',
      hourLabel: 'Hour:',
      selectHour: 'Select an hour',
      createBtn: 'Create Appointment',
      bookedHours: '(Booked)',
      citasDelDia: 'Appointments on selected day',
      misCitas: 'My Appointments',
      cancel: 'Cancel',
      todasCitas: 'All Appointments',
      todayAppointments:"NO AVAILABLE DATES",
      error: "Error",
      completeFields: "Please complete all fields.",
      citaCreated: "Appointment created successfully",
      citaNotAvailable: "The appointment is not available.",
      citaCancelled: "Appointment successfully cancelled",
      success: "Success"
    },
    centros: {
      title: 'Our Centers'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'es', // Idioma por defecto
  messages
})

export default i18n
