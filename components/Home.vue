<template>
  <v-container>
    <v-row class="row-card">
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/gestion">
          <v-card class="cards">
            <v-img
              aspect-ratio="16/9"
              src="https://i.ibb.co/346TXxq/088b1f3c-1c1c-4274-ab8a-eeda80eb1f21.jpg"
            ></v-img>
            <v-card-title>Gestión</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/digital">
          <v-card class="cards">
            <v-img
            aspect-ratio="16/9"
            cover
            src="https://i.ibb.co/2MWXmSV/nube.jpg"
            ></v-img>
            <v-card-title>Archivo digital</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/fisico">
          <v-card class="cards">
            <v-img
            aspect-ratio="16/9"
            cover
            src="https://i.ibb.co/5GgFrq1/fisico.jpg"
            ></v-img>
            <v-card-title>Archivo físico</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/estatus">
          <v-card class="cards">
            <v-img
              aspect-ratio="16/9"
              cover
              src="https://i.ibb.co/dtfPVT2/942a5ae0-a346-49ed-96e9-c9a104bbcc5f.jpg"
            ></v-img>
            <v-card-title>Mi estatus</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col>
      <!-- <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/estadisticas">
          <v-card class="cards">
            <v-img
            aspect-ratio="16/9"
            cover
            src="https://i.ibb.co/4f7PkHV/estadistica.jpg"
            ></v-img>
            <v-card-title>Estadísticas</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col> -->
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <nuxt-link to="/requerimientos">
          <v-card class="cards">
            <v-img
            aspect-ratio="16/9"
            cover
            src="https://i.ibb.co/8cLGNrP/requerimientos.jpg"
            ></v-img>
            <v-card-title>Requerimientos especiales</v-card-title>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
<Drawer/>
</template>

<style lang="scss" scoped>
.row-card {
  justify-content: center;
  margin-top: 35px;

  .cards {
    background-color:$azul-claro;
    border: 1px solid $gris-Claro;
    margin: 10px;
    text-align: center;
    padding: 20px;
    font-family: Poppins;
    width: auto;
    height: auto;
  }
}
</style>
