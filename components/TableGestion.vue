<script setup>
import { ref, computed } from 'vue';
import EditUser from '@/components/EditUser.vue';
const data = ref([]);
const editingUser = ref(null);
const props = defineProps({
  searchTerm: String,
});

fetch('https://inventario-3hbd.onrender.com/api/users')
  .then(response => response.json())
  .then(json => {
    data.value = json.data; // Ahora accedemos directamente a la propiedad 'data' del objeto JSON
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
const dialog = ref(false); // Estado para manejar la apertura del diálogo
const deletingItemId = ref(null); // Estado para guardar el ID del artículo que se va a eliminar

const openDeleteDialog = (id) => {
  deletingItemId.value = id; // Guardar el ID del artículo que se va a eliminar
  dialog.value = true; // Abrir el diálogo
};
const deleteItem = () => {
  // Utiliza el ID del artículo guardado en deletingItemId.value para eliminarlo
  fetch(`https://inventario-3hbd.onrender.com/api/users/${deletingItemId.value}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        // Encuentra el índice del artículo y elimínalo de la matriz de datos
        const index = data.value.findIndex(item => item.id === deletingItemId.value);
        if (index > -1) {
          data.value.splice(index, 1);
        }
        dialog.value = false; // Cerrar el diálogo
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
    dialog.value = false; // Cerrar el diálogo
};



const closeDialog = () => {
  dialog.value = false; // Cerrar el diálogo
};

const editingItem = ref(null);


const editDialog = ref(false); // Estado para manejar la apertura del diálogo de edición
const editingItemId = ref(null); // Estado para guardar el ID del artículo que se va a editar

const editItem = async (item) => {
  try {
    const response = await fetch(`https://inventario-3hbd.onrender.com/api/users/${item.id}`);
    const json = await response.json();

    if (json && json.data && json.data.length > 0) {
      editingUser.value = json.data[0]; // Guardar los datos del usuario en el componente
      editDialog.value = true; // Abrir el diálogo de edición
    } else {
      console.error('No se encontraron datos del usuario válidos en la respuesta del servidor.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const handleUserUpdated = (updatedUser) => {
  // Find the index of the user that was updated
  const index = data.value.findIndex(user => user.id === updatedUser.id);

  // Update the user at the found index with the updated user data
  if (index > -1) {
    data.value[index] = updatedUser;
  }
};



const closeEditDialog = () => {
  editDialog.value = false; // Cerrar el diálogo de edición
};

</script>

<template>
  <v-table class="content-table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Numero de documento
        </th>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Estado
        </th>
        <th class="text-left">
          Opciones
        </th>
      </tr>
    </thead>
    <v-dialog v-model="editDialog"  width="500px" max-width="500px">
      <template v-slot:activator="{ props }">
      </template>
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
        <td>{{ item.firstName }} {{ item.lastName }}</td> <!-- Nombre completo -->
        <td>{{ item.documentNumber }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-btn density="compact" icon="fa-solid fa-pen-to-square" @click="editItem(item)">
                <v-icon size="20">fa-solid fa-pen-to-square</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn color="red" density="compact" icon="fa-solid fa-trash" @click="openDeleteDialog(item.id)">
                <v-icon size="15">fa-solid fa-trash</v-icon>
              </v-btn>
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