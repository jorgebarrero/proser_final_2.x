// Generar un numero aleatorio que identifica la petición
export function randomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
