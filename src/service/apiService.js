
const BASE_URL = 'http://127.0.0.1:5000'

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  if (!response.ok) throw new Error('Error al iniciar sesión')
  return await response.json()
}

export const registerUser = async (userData) => {
  const formattedDate = new Date(userData.date).toLocaleDateString('es-ES');
  
  const requestBody = {
    ...userData,
    date: formattedDate
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) throw new Error('Error al registrar usuario');
  return await response.json();
}


export const getUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) throw new Error('Error al obtener perfil')
  return await response.json()
}

export const updateUserProfile = async (token, updatedData) => {
  const response = await fetch(`${BASE_URL}/currentUser`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  })
  if (!response.ok) throw new Error('Error al actualizar perfil')
  return await response.json()
}


export const getCenters = async (token) => {
  const response = await fetch(`${BASE_URL}/centers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });
  if (!response.ok) throw new Error('Error al obtener centros');
  return await response.json();
};

const getToken = () => localStorage.getItem('token');

// Función para formatear la fecha
const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(',', ''); // Elimina la coma entre la fecha y la hora
  return formattedDate;
};

// Función para crear la cita
export const crearCita = async (center, date) => {
  // Formatear la fecha antes de enviarla
  const formattedDate = formatDate(date);

  const response = await fetch(`${BASE_URL}/date/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ center, date: formattedDate }) // Enviar la fecha formateada
  });

  if (!response.ok) throw new Error('Error al crear cita');
  return await response.json();
};


export const cancelarCita = async (center, date) => {
  const response = await fetch(`${BASE_URL}/date/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ center, date })
  });
  if (!response.ok) throw new Error('Error al cancelar cita');
  return await response.json();
};

export const getCitasUsuario = async () => {
  const response = await fetch(`${BASE_URL}/date/getByUser`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!response.ok) throw new Error('Error al obtener citas del usuario');
  return await response.json();
};

export const getTodasLasCitas = async () => {
  const response = await fetch(`${BASE_URL}/dates`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!response.ok) throw new Error('Error al obtener todas las citas');
  return await response.json();
};

export const getCitasPorDia = async (day) => {
  const response = await fetch(`${BASE_URL}/date/getByDay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ day })
  });
  if (!response.ok) throw new Error('Error al obtener citas por día');
  return await response.json();
};

