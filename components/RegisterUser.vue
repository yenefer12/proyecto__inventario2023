<script setup>
import { ref, onMounted } from 'vue';


const newDocument = ref({
  name: '',
  descrip: '',
  idUser: null,
  idStatus: null,
  file: null,
});
const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  cellphone: '',
  dateOfBirth: '',
  documentNumber: '',
  userName: '',
  password: '',
  gender: null,
  documentType: null,
  department: null,
  userType: null
});


const users = ref([]);
const statuses = ref([]);


const emit = defineEmits(['document-created', 'close-dialog']);


const createDocument = async () => {
  try {
    const formData = new FormData();
    formData.append('name', newDocument.value.name);
    formData.append('descrip', newDocument.value.descrip);
    formData.append('file', newDocument.value.file);


    const response = await fetch('https://docymento.onrender.com/api/v1/digitalDocuments', {
      method: 'POST',
      body: formData
    });


    if (!response.ok) {
      throw new Error('Error creating the document');
    }


    alert('Document created successfully!');
    newDocument.value = {
      name: '',
      descrip: '',
      idUser: null,
      idStatus: null,
      file: null,
    };
    emit('document-created');
  } catch (error) {
    alert('Hubo un error al crear el documento.');
  }
};


defineExpose({
  createDocument
});


// Fetch data for users and statuses on component mount
onMounted(async () => {
  await fetchData('https://docymento.onrender.com/api/v1/users/', users);
  await fetchData('https://docymento.onrender.com/api/v1/status', statuses);
});


const fetchData = async (url, dataRef) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dataRef.value = data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};
</script>


<template>
  <v-form @submit.prevent="handleSubmit">
      <v-text-field label="Nombre" v-model="user.firstName" />
      <v-text-field label="Apellido" v-model="user.lastName" />
      <v-text-field label="Email" type="email" v-model="user.email" />
      <v-text-field label="Celular" v-model="user.cellphone" />
      <v-text-field label="Fecha de nacimiento" type="date" v-model="user.dateOfBirth" />
      <v-text-field label="Nuemero de documento" v-model="user.documentNumber" />
      <v-text-field label="Usuario" v-model="user.userName" />
      <v-text-field label="Contraseña" type="password" v-model="user.password" />


      <v-select label="Genero" :items="genderItems" v-model="user.gender" item-value="value" item-title="text" />
      <v-select label="Tipo de documento" :items="documentTypeItems" v-model="user.documentType" item-value="id" item-title="name"/>
      <v-select label="Area" :items="departmentItems" v-model="user.department" item-value="id" item-title="name" />
      <v-select label="Tipo de usuario" :items="userTypeItems" v-model="user.userType" item-value="id" item-title="name" />
      <v-btn class="btn" type="submit" >Registrarse</v-btn>
  </v-form>
</template>




<style lang="scss" scoped>


</style>
