<script setup>
import { ref } from 'vue';
import RegisterUser from '@/components/RegisterUser.vue';

const username = ref("");
const password = ref("");
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

const login = async () => {
  try {
    const data = await useFetch(
      () => `https://inventario-3hbd.onrender.com/api/users/login/username/${username.value}/password/${password.value}`
    );
    if (data.data._rawValue) {
      navigateTo(`/home`);
    }
    console.log(data);
  } catch (error) {
    console.error(error);
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
        <v-form ref="form">
          <v-text-field
            v-model="username"
            label="Usuario"
            dense
            outlined
            required
            :rules="usernameRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            dense
            outlined
            required
            :rules="passwordRules"
            :append-inner-icon="flag ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click:append-inner="flag = !flag"
            :type="flag ? 'text' : 'password'"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block dark @click="login">Ingresar</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-row class="bootom-options" no-gutters align="center" justify="center">
          <v-col class="registre" align="center">
            <p  @click="openRegisterModal">Registrarme</p>
          </v-col>
          <v-col align="center">
            <p>Olvidé mi contraseña</p>
          </v-col>
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