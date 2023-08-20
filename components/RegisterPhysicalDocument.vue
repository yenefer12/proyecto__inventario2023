<template>
  <v-form @submit.prevent="submitDocument">


      <!-- Name Input -->
      <v-text-field label="Nombre" v-model="document.name" />


      <!-- Description Input -->
      <v-text-field label="Descripción" v-model="document.descrip" />


      <!-- User Select -->
      <v-select
          label="Usuario"
          :items="userItems"
          v-model="document.idUser"
          item-value="id"
          item-title="firstName"
      />


      <!-- Status Select -->
      <v-select
          label="Estatus"
          :items="statusItems"
          v-model="document.idStatus"
          item-value="id"
          item-title="name"
      />
      <v-btn type="submit">Registrar</v-btn>
  </v-form>
</template>


<script setup>
import { ref, onMounted } from 'vue';


const emit = defineEmits(['document-created', 'close-dialog']);


const document = ref({
  name: '',
  descrip: '',
  idUser: '',
  idStatus: '',
});


const userItems = ref([]);
const statusItems = ref([]);


async function fetchData(url, output) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      output.value = data;
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}


onMounted(() => {
  fetchData("https://docymento.onrender.com/api/v1/users", userItems);
  fetchData("https://docymento.onrender.com/api/v1/status", statusItems);
});






async function submitDocument() {
  const formData = new FormData();
  formData.append('name', document.value.name);
  formData.append('descrip', document.value.descrip);
  formData.append('idUser', document.value.idUser);
  formData.append('idStatus', document.value.idStatus);


  try {
      const response = await fetch('https://docymento.onrender.com/api/v1/physicalDocuments', {
          method: 'POST',
          body: formData
      });


      const data = await response.json();
      if(response.ok) {
          emit('document-created', data);
          alert('Document successfully created!');
      } else {
          alert('Error creating document: ' + data.message);
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
</script>