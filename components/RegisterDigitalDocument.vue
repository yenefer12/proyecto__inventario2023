<template>
  <v-form @submit.prevent="submitDocument">
   
    <!-- Name Input -->
    <v-text-field label="Nombre" v-model="document.name" />

    <!-- Description Input -->
    <v-text-field label="Descripción" v-model="document.descrip" />

    <v-select
      label="Usuario"
      :items="userItems"
      v-model="document.idUser"
      item-value="id"
      item-title="firstName"
    />
   
    <v-select
      label="Estatus"
      :items="statusItems"
      v-model="document.idStatus"
      item-value="id"
      item-title="name"
    />

    <!-- File Input -->
    <v-file-input label="Documento" @change="onFileChange"></v-file-input>

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
  file: null
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

function onFileChange(event) {
  document.value.file = event.target.files[0];
}

async function submitDocument() {
  const formData = new FormData();
  formData.append('name', document.value.name);
  formData.append('descrip', document.value.descrip);
  formData.append('idUser', document.value.idUser);
  formData.append('idStatus', document.value.idStatus);
  formData.append('file', document.value.file);

  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/digitalDocuments', {
      method: 'POST',
      body: formData
    });
   
    const data = await response.json();
    emit('document-created', data);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

</script>
