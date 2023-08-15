<script setup>
import { ref, computed } from 'vue';
import RegisterDigitalDocument from '@/components/RegisterDigitalDocument.vue';


const registerDialog = ref(false);
const isAdmin = ref(false);
const data = ref([]);
const props = defineProps({
  searchTerm: String,
});


const handleDocumentCreated = (createdDocument) => {
    data.value.push(createdDocument);
    fetchUsers();
    registerDialog.value = false;
};


fetch('https://docymento.onrender.com/api/v1/digitalDocuments/')
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
    const fullName = (item.name).toLowerCase();
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
  fetch(`https://docymento.onrender.com/api/v1/digitalDocuments/${deletingItemId.value}`, {
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
const userData = ref({});


const closeDialog = () => {
  dialog.value = false;
};


const downloadDocument = async (item) => {
  // Iniciar la descarga como ya lo estás haciendo:
  const blob = new Blob([new Uint8Array(item.file.data)], { type: "application/pdf" });


  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = item.name;
  link.click();


  URL.revokeObjectURL(link.href);
 
  // Ahora, registra la solicitud en la base de datos:
  const user = userData.value;
  if (!user || !user.id) {
    console.error('No user data available in localStorage');
    return;
  }
 
  const requestData = {
    userId: user.id,
    digitalDocumentId: item.id
  };


  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });


    if (!response.ok) {
      throw new Error(`Failed to create request. Status: ${response.status}`);
    }


    // Puedes hacer algo con la respuesta si lo necesitas, por ejemplo:
    const jsonResponse = await response.json();
    console.log('Request created:', jsonResponse);
  } catch (error) {
    console.error('Error creating the request:', error);
  }
};




onMounted(async() => {
  const storedUserData = localStorage.getItem('userData');
  console.log(storedUserData);
  if (storedUserData && storedUserData !== "undefined") {
    try {
        userData.value = JSON.parse(storedUserData);
        if (userData.value && userData.value.userType) {
        try {
            if (userData.value.userType === 2) {
                isAdmin.value = true;
            }
        } catch (error) {
            console.error("Error fetching department:", error);
        }
    }
    } catch (error) {
        console.error("Error parsing stored user data:", error);
    }
  }
});


const fetchUsers = async () => {
  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/digitalDocuments/');
    const json = await response.json();
    data.value = json;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


</script>


<template>
   <div class="register-button-container">
    <v-btn @click="registerDialog = true">Registrar Nuevo Documento</v-btn>
  </div>


  <v-dialog v-model="registerDialog" max-width="500px">
    <v-card>
      <v-card-text>
        <RegisterDigitalDocument style="width: 400px;"  @close-dialog="registerDialog = false" @document-created="handleDocumentCreated" />
      </v-card-text>
    </v-card>
  </v-dialog>


  <v-table class="content-table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Nombre</th>
        <th class="text-left">Descripción</th>
        <th class="text-left">Opciones</th>
      </tr>
    </thead>
   
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
        <td>{{ item.name }}</td>
        <td>{{ item.descrip }}</td>
        <td>
          <v-row align="center" justify="center">
            <v-col v-if="isAdmin" cols="4">
              <v-btn density="compact" icon="fa-solid fa-trash-can" @click="openDeleteDialog(item.id)"></v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn density="compact" icon="fa-solid fa-download" @click="downloadDocument(item)"></v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<style lang="scss" scoped>
.content-table, .register-button-container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>
