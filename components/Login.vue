<script setup>
  const username = ref("")
  const password = ref("")
  const flag = ref(false)

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