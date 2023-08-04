<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field label="First Name" v-model="user.firstName" />
    <v-text-field label="Last Name" v-model="user.lastName" />
    <v-text-field label="Email" type="email" v-model="user.email" />
    <v-text-field label="Cellphone" v-model="user.cellphone" />
    <v-text-field
      label="Date of Birth"
      type="date"
      v-model="user.dateOfBirth"
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
      item-value="value"
      item-title="text"
    />
    <v-select
      label="Status"
      :items="statusItems"
      v-model="user.status"
      item-value="value"
      item-title="text"
    />

    <v-btn type="submit" color="primary">Update</v-btn>
  </v-form>
</template>
<script setup>
const props = defineProps({
  user: Object,
});
const emit = defineEmits(["user-updated", "close-dialog"]);
watchEffect(() => {
  console.log("Received user:", props.user.id);
});
const handleSubmit = async () => {
  try {
    const response = await fetch(
      `https://inventario-3hbd.onrender.com/api/users/${props.user.id}`,
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
const selectedGender = computed({
  get: () => genderItems.find((item) => item.value === props.user.gender),
  set: (item) => {
    props.user.gender = item ? item.value : null;
  },
});

const documentTypeItems = [
  { value: 1, text: "Type 1" },
  { value: 2, text: "Type 2" },
];
const selectedDocumentType = computed({
  get: () =>
    documentTypeItems.find((item) => item.value === props.user.documentType),
  set: (item) => {
    props.user.documentType = item ? item.value : null;
  },
});

const statusItems = [
  { value: 1, text: "Active" },
  { value: 0, text: "Inactive" },
];
const selectedStatus = computed({
  get: () => statusItems.find((item) => item.value === props.user.status),
  set: (item) => {
    props.user.status = item ? item.value : null;
  },
});
</script>
