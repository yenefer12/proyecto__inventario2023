<script setup>
import RegisterUser from '@/components/RegisterUser.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const isClient = process.client;


const user = ref({
  username: '',
  password: '',
});


const flag = ref(false);
const registerDialog = ref(false);


const registerUserComponent = ref(null);


const usernameRules = [
  (v) => !!v || "El nombre de usuario es obligatorio",
  (v) => v.length >= 4 || "Por favor ingresar un usuario",
];


const passwordRules = [
  (v) => !!v || "La contraseña es obligatoria",
  (v) => v.length >= 6 || "Por favor ingresar una contraseña",
];


const registerUser = () => {
  registerUserComponent.value.handleSubmit();
};


const handleSubmit = async () => {
  try {
    const { data: responseData } = await useFetch('https://docymento.onrender.com/login/', {
      method: 'post',
      body: {
        email: user.value.username,
        password: user.value.password,
      }
    });


    if (isClient) { // Solo guardar en localStorage si estamos en el cliente
      localStorage.setItem('jwtToken', responseData._rawValue.token);
      localStorage.setItem('userData', JSON.stringify(responseData._rawValue.user));
    }


    router.push('/home');
  } catch (error) {
    console.error("Error during login:", error);
  }
};




const openRegisterModal = () => {
  registerDialog.value = true;
};


const onUserRegistered = () => {
  registerDialog.value = false; // Cierra el modal
};
</script>


<template>
  <v-container>
    <v-card>
      <v-img
        :width="130"
        :height="130"
        aspect-ratio="16/9"
        cover
        src="https://i.ibb.co/d6Q8CCn/be98a687-9e67-492f-9e30-2c54ce96fe0f.jpg"
      ></v-img>
      <v-card-title align-center>Iniciar sesión</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="user.username"
            label="Usuario"
            dense
            outlined
            required
            :rules="usernameRules"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Contraseña"
            dense
            outlined
            required
            :rules="passwordRules"
            :append-inner-icon="flag ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click:append-inner="flag = !flag"
            :type="flag ? 'text' : 'password'"
          ></v-text-field>
          <v-card-actions>
            <v-btn block dark type="submit">Ingresar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-row class="bootom-options" no-gutters align="center" justify="center">
          <v-col class="registre" align="center">
            <p  @click="openRegisterModal">Registrarme</p>
          </v-col>
          <!-- <v-col align="center">
            <p>Olvidé mi contraseña</p>
          </v-col> -->
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>


  <v-dialog v-model="registerDialog" max-width="400">
    <v-card>
      <v-card-title class="text-center">Registrarse</v-card-title>
      <v-card-text>
        <RegisterUser ref="registerUserComponent" @user-registered="onUserRegistered"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<style lang="scss" scoped>
.v-container{
  font-family: "Poppins";
  width: 100vw;
  height: 100vh;
  .v-card {
    width: 50%;
    margin-top: 2vh;
    margin-left: auto;
    margin-right: auto;
    .v-img {
      margin-left: auto;
      margin-right: auto;
    }
    .v-card-title {
      text-align: center;
    }
    .v-btn {
      margin-left: auto;
      margin-right: auto;
      font-family: "Poppins";
      text-transform: capitalize;
      background-color: $azul-Marino;
      color: $blanco;
    }
    .bootom-options {
      color: $azul-Marino;
      .registre{
        cursor: pointer;
      }
    }
  }
}
</style>


