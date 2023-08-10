<script setup>
import { ref, computed } from 'vue';
import EditUser from '@/components/EditUser.vue';


const data = ref([]);
const editingUser = ref(null);
const props = defineProps({
  searchTerm: String,
});


fetch('https://docymento.onrender.com/api/v1/users/')
  .then(response => response.json())
  .then(json => {
    data.value = json;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


const filteredData = computed(() => {
  const searchTerm = props.searchTerm || '';
  const searchTermLowerCase = searchTerm.toLowerCase();
  return data.value.filter(item => {
    const fullName = (item.firstName + ' ' + item.lastName).toLowerCase();
    return fullName.includes(searchTermLowerCase);
  });
});


const dialog = ref(false);
const deletingItemId = ref(null);


const openDeleteDialog = (id) => {
  deletingItemId.value = id;
  dialog.value = true;
};


const deleteItem = () => {
  fetch(`https://docymento.onrender.com/api/v1/users/${deletingItemId.value}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        const index = data.value.findIndex(item => item.id === deletingItemId.value);
        if (index > -1) {
          data.value.splice(index, 1);
        }
        dialog.value = false;
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  dialog.value = false;
};


const closeDialog = () => {
  dialog.value = false;
};


const editDialog = ref(false);




const editItem = async (item) => {
  try {
    const response = await fetch(`https://docymento.onrender.com/api/v1/users/${item.id}`);
    const json = await response.json();
    console.log(json);
    if (json) {
      editingUser.value = json;
      console.log(editingUser.value.id);
      editDialog.value = true;
    } else {
      console.error('No se encontraron datos del usuario válidos en la respuesta del servidor.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}




const handleUserUpdated = (updatedUser) => {
  const index = data.value.findIndex(user => user.id === updatedUser.id);
  if (index > -1) {
    data.value[index] = deepClone(updatedUser);
  }
  fetchUsers();  // <-- Fetch the data again
};




const closeEditDialog = () => {
  editDialog.value = false;
};
const fetchUsers = async () => {
  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/users/');
    const json = await response.json();
    data.value = json;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


fetchUsers();


</script>


<template>
  <v-table class="content-table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Nombre</th>
        <th class="text-left">Numero de documento</th>
        <th class="text-left">Id</th>
        <th class="text-left">Usuario</th>
        <th class="text-left">Tipo de Usuario</th>
        <th class="text-left">Departamento</th>
        <th class="text-left">Opciones</th>
      </tr>
    </thead>
    <v-dialog v-model="editDialog" width="500px" max-width="500px">
      <template v-slot:activator="{ props }"></template>
      <v-card>
        <v-card-text>
          <EditUser :user="editingUser" @close-dialog="closeEditDialog" @user-updated="handleUserUpdated" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="editDialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Eliminar artículo</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este artículo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItem">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <tbody>
      <tr v-for="item in filteredData" :key="item.id">
        <td>{{ item.firstName }} {{ item.lastName }}</td>
        <td>{{ item.documentNumber }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.userName }}</td>
        <td>{{ item.userUserType.name }}</td>
        <td>{{ item.userDepartment.name }}</td>
        <td>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-btn density="compact" icon="fa-solid fa-pen-to-square" @click="editItem(item)"></v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn density="compact" icon="fa-solid fa-trash-can" @click="openDeleteDialog(item.id)"></v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>
.content-table {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>
