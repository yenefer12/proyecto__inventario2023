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
      <v-select label="Document Type" :items="documentTypeItems" v-model="user.documentType" item-value="value"
          item-title="text" />
      <v-select label="Status" :items="statusItems" v-model="user.status" item-value="value" item-title="text" />

      <v-btn class="btn" type="submit" >Registrarse</v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';

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
  status: null,
});

const genderItems = [
  { value: 1, text: 'Male' },
  { value: 2, text: 'Female' },
];

const documentTypeItems = [
  { value: 1, text: 'Type 1' },
  { value: 2, text: 'Type 2' },
];

const statusItems = [
  { value: 1, text: 'Active' },
  { value: 0, text: 'Inactive' },
];
const emit = defineEmits(['user-registered', 'close-dialog'])
const handleSubmit = async () => {
  try {
      const response = await fetch('https://inventario-3hbd.onrender.com/api/users', {
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
          status: null,
      };
      emit('user-registered')
  } catch (error) {
      alert('Hubo un error al crear el usuario.');
  }
};

defineExpose({
  handleSubmit
});
</script>
<style lang="scss" scoped>

</style>