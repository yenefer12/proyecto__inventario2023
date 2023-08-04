<template>
  <v-card >
    <v-layout>
      <v-app-bar
        color="#0A082D"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"><i class="fa-solid fa-bars icon-drawer"></i></v-app-bar-nav-icon>
        <v-app-bar-nav-icon  class="logo" ><nuxt-link  to="/home"><img src="https://i.ibb.co/kJkxjTJ/image-20230802-211448.png" alt=""></nuxt-link></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/gestion">Gestión</nuxt-link></v-toolbar-title>

        <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/digital">Digital</nuxt-link></v-toolbar-title>

        <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/fisico">Físico</nuxt-link></v-toolbar-title>

        <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/estatus">Mi estatus</nuxt-link></v-toolbar-title>

        <!-- <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/estadisticas">Estadísticas</nuxt-link></v-toolbar-title> -->

        <v-toolbar-title class="title subtitle hiden"><nuxt-link class="text-color-drawer" to="/requerimientos">Requerimientos</nuxt-link></v-toolbar-title>

        <v-btn><i class="fa-solid fa-user icon-user"></i>
          <v-tooltip
            activator="parent"
            location="bottom"
            class="text-center"
            >
            <a>Yenifer Ortiz Herrera</a>
          </v-tooltip>
        </v-btn>
        <v-btn
          @click="exit"
        >
          <i class="fa-solid fa-arrow-right-from-bracket icon-exit"></i>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
        class="list-drawer"
      >
        <v-list class="text-center">
          <v-list-item
          class="fa-solid fa-user icon-user-drawer"
          >
          </v-list-item>
          <v-list-item>
            Yenifer Ortiz Herrera
          </v-list-item>
          <v-list-item>
            Area de talento humano
          </v-list-item>
        </v-list>

        <div class="hiden-text">
          <div class="line"></div>
          <p class="text-center mt-4">Modulos</p>
        </div>

        <v-list >
          <v-list-item class="title subtitle color-text">
            <nuxt-link class="color-text" to="/gestion">Gestión</nuxt-link>
          </v-list-item>
          <v-list-item class="title subtitle ">
            <nuxt-link class="color-text" to="/digital">Archivo digital</nuxt-link>
          </v-list-item>
          <v-list-item class="title subtitle ">
            <nuxt-link class="color-text" to="/fisico">Archivo físico</nuxt-link>
          </v-list-item>
          <v-list-item class="title subtitle ">
            <nuxt-link class="color-text" to="/estatus">Mi estatus</nuxt-link>
          </v-list-item>
          <!-- <v-list-item class="title subtitle ">
            <nuxt-link class="color-text" to="/estadisticas">Estadísticas</nuxt-link>
          </v-list-item> -->
          <v-list-item class="title subtitle ">
            <nuxt-link class="color-text" to="/requerimientos">Requerimientos</nuxt-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<script setup>

  const drawer = ref(false)

  const exit = () =>{
    navigateTo( `/home` )
  }
</script>
<style lang="scss" scoped>
  .icon-drawer{
    color: $blanco;
  }
  .icon-user{
    color: $blanco;
    font-size: 2rem;
    margin-right: 1rem;
  }
  .icon-exit{
    color: $blanco;
    font-size: 2rem;
  }
  .title{
    font-family: "Poppins";
    color: $blanco;
    display: block;
    
    &:not(.subtitle){
      font-family: "Poppins";
      font-weight: 900;
      color: $blanco;
      font-size: 2rem;
    }
    .text-color-drawer{
      color: $blanco ;
    }
  }
  .list-drawer{
    justify-content: center !important;
    align-items: center;
    color: $azul-Marino;
    .icon-user-drawer{
      justify-content: center !important;
      color: $azul-Marino;
      font-size: 5rem;
    }

  }
  .v-card{
    margin-bottom: 70px;
    z-index: 10;
  }
  .router-link-exact-active{
    color: $azul-claro !important;
  }
  .line{
    border-bottom: 1px solid $negro;
  }
  @media screen and (max-width: 1000px) {
    .hiden{
      display: none;
    }
    
  }
  @media screen and (min-width: 1000px) {
    .title.subtitle:not(.hiden){
      display: none;
    }
    .hiden-text{
      display: none;
    }
    
  }
.logo img {
  width: 180%;
  height: auto;
}
.color-text{
  color: $azul-Marino;
}

</style>