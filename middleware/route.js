
const isClient = process.client;

export default function ({ route }) {

  console.log(isClient);
  if (isClient) {
    // Verifica si el usuario está autenticado y es administrador
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedUserData, "feoooo");
    
    if (!storedUserData) {
      console.log("diegoooo");
      // Redirige al inicio de sesión o a cualquier otra página
      return navigateTo('/'); // Asegúrate de proporcionar la ruta correcta aquí
      // Importante: detén la ejecución del middleware después de redirigir
    }
  }
  
}
