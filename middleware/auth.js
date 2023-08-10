const isClient = process.client;
export default function ({  }) {
  console.log('object');
    if (isClient) {
      const storedUserData =  JSON.parse(localStorage.getItem('userData'))
       console.log(storedUserData);
      // Comprueba si el usuario está autenticado y es administrador
      if (!storedUserData || storedUserData.userType !== 2) {
        // Redirige al inicio de sesión o a cualquier otra página
        return navigateTo('/home');
      }
    }
  }
