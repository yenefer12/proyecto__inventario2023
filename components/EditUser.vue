<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field label="First Name" v-model="user.firstName" />
    <v-text-field label="Last Name" v-model="user.lastName" />
    <v-text-field label="Email" type="email" v-model="user.email" />
    <v-text-field label="Cellphone" v-model="user.cellphone" />
    <v-text-field
      label="Date of Birth"
      type="date"
      v-model="formattedDateOfBirth"
    />
    <v-text-field label="Document Number" v-model="user.documentNumber" />
    <v-text-field label="Username" v-model="user.userName" />
    <v-text-field label="Password" type="password" v-model="user.password" />


    <v-select
      label="Gender"
      :items="genderItems"
      v-model="user.gender"
      item-value="value"
      item-title="text"
    />
    <v-select
      label="Document Type"
      :items="documentTypeItems"
      v-model="user.documentType"
      item-value="id"
      item-title="name"
    />
    <v-select
      label="Department"
      :items="departmentItems"
      v-model="user.department"
      item-value="id"
      item-title="name"
    />


    <v-select
      label="User Type"
      :items="userTypeItems"
      v-model="user.userType"
      item-value="id"
      item-title="name"
    />


    <v-btn type="submit" color="primary">Update</v-btn>
  </v-form>
</template>


<script setup>
import {computed } from 'vue';
const userTypeItems = ref([]);
const departmentItems = ref([]);
const documentTypeItems = ref([]);
const props = defineProps({
  user: Object,
});
const emit = defineEmits(["user-updated", "close-dialog"]);
const userCopy = ref({ ...props.user });
const handleSubmit = async () => {
  try {
    const response = await fetch(
      `https://docymento.onrender.com/api/v1/users/${props.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.user),
      }
    );


    // Emit the custom event with the updated user
    emit("user-updated", props.user);
    emit("close-dialog");
  } catch (error) {
    alert("Hubo un error al actualizar el usuario.");
  }
};






const genderItems = [
  { value: 1, text: "Male" },
  { value: 2, text: "Female" },
];


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
    if (!props.user.dateOfBirth) return null;
    const date = new Date(props.user.dateOfBirth);
    return date.toISOString().split('T')[0];
  },
  set: (newValue) => {
    props.user.dateOfBirth = newValue ? new Date(newValue).toISOString() : null;
  }
});


</script>
