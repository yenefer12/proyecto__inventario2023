<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';


const router = useRouter();


const drawer = ref(false);
const departmentName = ref('');
const userData = ref({});


onMounted(() => {
  const storedUserData = localStorage.getItem('userData');
  console.log(storedUserData);
  if (storedUserData && storedUserData !== "undefined") {
    try {
        userData.value = JSON.parse(storedUserData);
    } catch (error) {
        console.error("Error parsing stored user data:", error);
    }
  }
});


watch(userData, async (newVal) => {
  if (newVal && newVal.department) {
    try {
      const response = await useFetch(`https://docymento.onrender.com/api/v1/departments/${newVal.department}`);
      departmentName.value = response.data._rawValue.name;
      console.log(response.data._rawValue.name);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  }
}, { immediate: true });


const exit = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userData');
  router.push('/');
};


</script>




<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->


      <v-app-bar color="#0A082D" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"><i
            class="fa-solid fa-bars icon-drawer"></i></v-app-bar-nav-icon>


        <v-toolbar-title class="title">Inventario</v-toolbar-title>


        <v-spacer></v-spacer>


        <v-btn><i class="fa-solid fa-user icon-user"></i>
          <v-tooltip activator="parent" location="bottom" class="text-center">
            <a>{{ userData.firstName}} {{ userData.lastName}}</a>
          </v-tooltip>
        </v-btn>
        <v-btn @click="exit">
          <i class="fa-solid fa-arrow-right-from-bracket icon-exit"></i>
        </v-btn>
      </v-app-bar>


      <v-navigation-drawer v-model="drawer" location="left" temporary class="list-drawer">
        <v-list class="text-center">
          <v-list-item class="fa-solid fa-user icon-user-drawer">
          </v-list-item>
          <v-list-item v-if="userData">
            {{ userData.firstName }} {{ userData.lastName }}
          </v-list-item>
          <v-list-item>
            {{ departmentName }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>


<style lang="scss" scoped>
.icon-drawer {
  color: $blanco;
}


.icon-user {
  color: $blanco;
  font-size: 2rem;
  margin-right: 1rem;
}


.icon-exit {
  color: $blanco;
  font-size: 2rem;
}


.title {
  font-family: "Poppins";
  font-weight: 900;
  color: $blanco;
  font-size: 2rem;
}


.list-drawer {
  justify-content: center !important;
  align-items: center;
  color: $azul-Marino;


  .icon-user-drawer {
    justify-content: center !important;
    color: $azul-Marino;
    font-size: 5rem;
  }


}


.v-card {
  z-index: 10;
}
</style>
