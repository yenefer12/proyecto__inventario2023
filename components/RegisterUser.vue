<script setup>
import { ref, onMounted } from 'vue';

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
  userType:null,
});

const genderItems = [
  { value: 1, text: 'Male' },
  { value: 2, text: 'Female' },
];

const departmentItems = ref([]);
const userTypeItems = ref([]);
const documentTypeItems = ref([]);

// const statusItems = [
//   { value: 1, text: 'Active' },
//   { value: 0, text: 'Inactive' },
// ];

const emit = defineEmits(['user-registered', 'close-dialog']);

const handleSubmit = async () => {
  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user.value),
    });

    if (!response.ok) {
      throw new Error('Error creating the user');
    }

    alert('User created successfully!');
    user.value = {
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
      userType: null,
    };
    emit('user-registered');
  } catch (error) {
    alert('Hubo un error al crear el usuario.');
  }
};

defineExpose({
  handleSubmit
});

// Fetch data for departmentItems and userTypeItems on component mount
onMounted(async () => {
  await fetchData('https://docymento.onrender.com/api/v1/departments/', departmentItems);
  await fetchData('https://docymento.onrender.com/api/v1/userType', userTypeItems);
  await fetchData('https://docymento.onrender.com/api/v1/document_Type', documentTypeItems);

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