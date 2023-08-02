<script setup>
  const username = ref("")
  const password = ref("")
  const flag = ref(false)

  const login = async () => {
  try {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://inventario-3hbd.onrender.com/api/users/login/username/${username.value}/password/${password.value}`;
    
    // Set up the headers to include any necessary information (e.g., authentication tokens, content-type)
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json', // Assuming the API accepts JSON data
      // Add any other headers as needed for your API
    };

    // Perform the fetch request with the specified URL, headers, and method (POST in this case)
    const response = await fetch(apiUrl, {
      method: 'GET', // Adjust the method if required (e.g., GET, POST, PUT, DELETE)
      headers: headers,
      mode:'no-cors'
    });

    // Wait for the server response
    const data = await response.json();

    // Handle the response data as needed, e.g., check for errors, update state, etc.
    console.log(data);

    // Check the response status to decide if the login was successful
    if (response.ok) {
      // If login was successful, navigate to the /home page
      navigateTo('/home');
    } else {
      // If login failed, display an error message or handle it accordingly
      console.error('Login failed:', data);
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error);
  }
};

</script>
<template>
  <v-container>
        <v-card
        >
          <v-img
            :width="130"
            :height="130"
            aspect-ratio="16/9"
            cover
            src="https://i.ibb.co/d6Q8CCn/be98a687-9e67-492f-9e30-2c54ce96fe0f.jpg"
          ></v-img>
          <v-card-title align-center >Iniciar sesión</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="username"
                label="Usuario"
                dense
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                dense
                outlined
                required
                :append-icon="flag ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click:append="flag = !flag"
                :type="flag ? 'text' : 'password'"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block dark @click="login">Ingresar</v-btn>
          </v-card-actions>
          <v-card-text>
        <v-row class="bootom-options" no-gutters align="center" justify="center">
          <v-col align="center">
            <p>Resgistrarme</p>
          </v-col>
          <v-col align="center">
            <p>Olvidé mi contraseña</p>
          </v-col>
        </v-row>
      </v-card-text>
        </v-card>
  </v-container>
</template>


<style lang="scss" scoped>
.v-container{
  font-family: "Poppins";
  width: 100vw;
  height: 100vh;
  .v-card {
    width: 50%;
    margin-top:2vh ;
    margin-left: auto;
    margin-right: auto;
    .v-img{
      margin-left: auto;
      margin-right: auto;
    }
    .v-card-title{
      text-align: center;
    }
    .v-btn{
      margin-left: auto;
      margin-right: auto;
      font-family: "Poppins";
      text-transform: capitalize;
      background-color: $azul-Marino;
      color: $blanco;
    }
    .bootom-options{
      color: $azul-Marino;
    }
  }
}
</style>