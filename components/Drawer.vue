<template>
  <v-card >
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="#0A082D"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"><i class="fa-solid fa-bars icon-drawer"></i></v-app-bar-nav-icon>

        <v-toolbar-title class="title">Inventario</v-toolbar-title>

        <v-spacer></v-spacer>

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
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<script setup>

  const drawer = ref(false)

  const exit = () =>{
    navigateTo( `/` )
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
    font-weight: 900;
    color: $blanco;
    font-size: 2rem;
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
</style>