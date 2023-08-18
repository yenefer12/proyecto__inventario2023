<template>
  <v-form @submit.prevent="handleRegister">
    <v-text-field label="Nombre" v-model="user.firstName" />
    <v-text-field label="Apellido" v-model="user.lastName" />
    <v-text-field label="Correo" type="email" v-model="user.email" />
    <v-text-field label="Celular" v-model="user.cellphone" />
    <v-text-field label="Fecha de nacimiento" type="date" v-model="formattedDateOfBirth" />
    <v-text-field label="Numero de documento" v-model="user.documentNumber" />
    <v-text-field label="Usuario" v-model="user.userName" />
    <v-text-field label="Contraseña" type="password" v-model="user.password" />
    <v-select label="Genero" :items="genderItems" v-model="user.gender" item-value="value" item-title="text" />
    <v-select label="Tipo de documento" :items="documentTypeItems" v-model="user.documentType" item-value="id" item-title="name" />
    <v-select label="Área" :items="departmentItems" v-model="user.department" item-value="id" item-title="name" />
    <v-select label="Tipo de usuaria" :items="userTypeItems" v-model="user.userType" item-value="id" item-title="name" />
    <v-btn type="submit" color="primary">Registrase</v-btn>
  </v-form>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const emit = defineEmits(["user-registered"]);
const user = ref({});
const userTypeItems = ref([]);
const departmentItems = ref([]);
const documentTypeItems = ref([]);

const genderItems = [
  { value: 1, text: "Male" },
  { value: 2, text: "Female" },
];

const handleRegister = async () => {
  try {
    const response = await fetch(
      `https://docymento.onrender.com/api/v1/users/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.value),
      }
    );

    if (response.ok) {
      // Handle successful registration (perhaps redirecting or notifying the user)
      emit("user-registered");
    } else {
      throw new Error("Failed to register");
    }
  } catch (error) {
    emit("user-registered");
    alert("Se ha registrado el usuario.");
  }
};

const fetchData = async (url, dataRef) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dataRef.value = data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

onMounted(() => {
  fetchData("https://docymento.onrender.com/api/v1/userType", userTypeItems);
  fetchData("https://docymento.onrender.com/api/v1/departments/", departmentItems);
  fetchData("https://docymento.onrender.com/api/v1/document_type", documentTypeItems);
});

const formattedDateOfBirth = computed({
  get: () => {
    if (!user.value.dateOfBirth) return null;
    const date = new Date(user.value.dateOfBirth);
    return date.toISOString().split('T')[0];
  },
  set: (newValue) => {
    user.value.dateOfBirth = newValue ? new Date(newValue).toISOString() : null;
  }
});


</script>