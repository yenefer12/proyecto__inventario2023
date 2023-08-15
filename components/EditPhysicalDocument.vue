<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field label="First Name" v-model="user.name" />
    <v-text-field label="Last Name" v-model="user.descrip" />
    <v-select
      label="Propietario"
      :items="userItems"
      v-model="user.idUser"
      item-value="id"
      item-title="firstName"
    />
    <v-select
      label="Estado"
      :items="statusItems"
      v-model="user.idStatus"
      item-value="id"
      item-title="name"
    />



    <v-btn type="submit" color="primary">Update</v-btn>
  </v-form>
</template>


<script setup>


const userItems = ref([]);
const statusItems = ref([]);
const props = defineProps({
  user: Object,
});
const emit = defineEmits(["user-updated", "close-dialog"]);
const userCopy = ref({ ...props.user });
const handleSubmit = async () => {
  try {
    const response = await fetch(
      `https://docymento.onrender.com/api/v1/physicalDocuments/${props.user.id}`,
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
  fetchData("https://docymento.onrender.com/api/v1/users", userItems);
  fetchData("https://docymento.onrender.com/api/v1/status", statusItems);
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
