<script setup>
import { ref } from 'vue';

const name = ref('');
const area = ref('');
const email = ref('');
const comment = ref('');

const nameRules = [
  (value) => {
    if (value?.length > 3) return true;
    return 'El nombre debe tener al menos 3 caracteres.';
  },
];

const areaRules = [ 
  (value) => {
    if (/[^0-9]/.test(value)) return true;
    return 'El área no puede contener dígitos.';
  },
];

const emailRules = [
  (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(value)) return true;
    return 'Formato de correo inválido.';
  },
];

const commentRules = [
  (value) => {
    if (value?.length > 10) return true;
    return 'El comentario debe tener al menos 10 caracteres.';
  },
];

// Lógica para enviar el formulario o manejar los datos ingresados
const submitForm = () => {
  // Aquí puedes implementar la lógica para enviar el formulario o realizar otras acciones
  // con los datos ingresados en los campos.
};
</script>

<template>
  <v-row class="container-form">
    <v-sheet width="600" class="mx-auto">
      <v-form @submit.prevent="submitForm">
        <h2 class="text-center mb-4">Requerimiento especial</h2>
        <v-text-field
          v-model="name"
          label="Nombre"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="area"
          label="Área"
          :rules="areaRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Correo"
          :rules="emailRules"
        ></v-text-field>
        <v-textarea
          v-model="comment"
          label="Solicitud"
          :rules="commentRules"
          rows="3"
        ></v-textarea>
        <v-btn type="submit" block class="mt-2 btn">Enviar</v-btn>
      </v-form>
    </v-sheet>
  </v-row>
</template>

<style lang="scss" scoped>
.container-form {
  margin-top: 100px; /* Ajusta el valor según tus preferencias */
}
.btn{
  background-color: $azul-Marino;
  color: $blanco;
}
</style>
