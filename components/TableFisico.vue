<script setup>
import { ref, computed } from 'vue';
import EditPhysicalDocument  from '@/components/EditPhysicalDocument.vue';


const requestsDialog = ref(false);
const userData = ref({});
const data = ref([]);
const editingUser = ref(null);
const props = defineProps({
  searchTerm: String,
});




fetch('https://docymento.onrender.com/api/v1/physicalDocuments/')
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


const registerDialog = ref(false);
const isAdmin = ref(false);
const dialog = ref(false);
const deletingItemId = ref(null);
const departmentName = ref('');


const openDeleteDialog = (id) => {
  deletingItemId.value = id;
  dialog.value = true;
};




const deleteItem = () => {
  fetch(`https://docymento.onrender.com/api/v1/physicalDocuments/${deletingItemId.value}`, {
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
    const response = await fetch(`https://docymento.onrender.com/api/v1/physicalDocuments/${item.id}`);
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


const handleDocumentCreated = (createdDocument) => {
    data.value.push(createdDocument);
    fetchUsers();
    registerDialog.value = false;
};




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
    const response = await fetch('https://docymento.onrender.com/api/v1/physicalDocuments/');
    const json = await response.json();
    data.value = json;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const requestDocument = async (idPhysicalDocument) => {
  try {
    // 1. Fetch user data from local storage
    const storedUserDataRaw = localStorage.getItem('userData');
    const storedUserData = JSON.parse(storedUserDataRaw);


    if (!storedUserData || !storedUserData.id) {
      console.error('User data not found in local storage.');
      return;
    }


    // 2. Construct the description
    const userFullName = `${storedUserData.firstName} ${storedUserData.lastName}`;
    const userEmail = storedUserData.email;
    const description = `El usuario ${userFullName} ha solicitado el documento. Enviar (${userEmail})`;


    // 3. Send the POST request to create a ticket
    const response = await fetch('https://docymento.onrender.com/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        idPhysicalDocument: idPhysicalDocument
      })
    });


    if (!response.ok) {
      throw new Error('Error requesting the document');
    }


    const result = await response.json();
    console.log('Document requested:', result);


    // 4. Register the physical document request in the database
    const requestData = {
      userId: storedUserData.id,
      physicalDocumentId: idPhysicalDocument
    };


    const registerResponse = await fetch('https://docymento.onrender.com/api/v1/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });


    if (!registerResponse.ok) {
      throw new Error(`Failed to create request for physical document. Status: ${registerResponse.status}`);
    }


    const registerResult = await registerResponse.json();
    console.log('Request for physical document registered:', registerResult);


  } catch (error) {
    console.error('Error:', error);
  }
}


onMounted(async() => {
  const storedUserData = localStorage.getItem('userData');
  console.log(storedUserData);
  if (storedUserData && storedUserData !== "undefined") {
    try {
        userData.value = JSON.parse(storedUserData);
        if (userData.value && userData.value.userType) {
        try {
            const response = await fetch(`https://docymento.onrender.com/api/v1/userType/${userData.value.userType}`);
            const userTypeData = await response.json();




            if (userTypeData.name === "Administrador") {
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




watch(userData, async (newVal) => {
  if (newVal && newVal.department) {
    try {
      const response = await useFetch(`https://docymento.onrender.com/api/v1/departments/${newVal.department}`);
      departmentName.value = response.data._rawValue.name;
      console.log(response.data._rawValue.name);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  }
}, { immediate: true });






fetchUsers();




</script>




<template>
  <div class="register-button-container">
    <v-btn @click="registerDialog = true">Registrar Nuevo Documento</v-btn>
    <v-btn v-if="isAdmin" @click="requestsDialog = true">Ver Solicitudes</v-btn>
  </div>


  <v-dialog v-model="registerDialog" max-width="500px">
    <v-card>
      <v-card-text>
        <RegisterPhysicalDocument style="width: 400px;"  @close-dialog="registerDialog = false" @document-created="handleDocumentCreated" />
      </v-card-text>
    </v-card>
  </v-dialog>


  <v-dialog v-model="requestsDialog" max-width="80%">
  <v-card>
    <v-card-text>
      <RequestsTable style="width: 100%;" />
    </v-card-text>
  </v-card>
</v-dialog>
  <v-table class="content-table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Descripción</th>
        <th class="text-left">Opciones</th>
      </tr>
    </thead>
    <v-dialog v-model="editDialog" width="500px" max-width="500px">
      <template v-slot:activator="{ props }"></template>
      <v-card>
        <v-card-text>
          <EditPhysicalDocument :user="editingUser" @close-dialog="closeEditDialog" @user-updated="handleUserUpdated"/>
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
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.descrip }}</td>
        <td>
          <v-row align="center" justify="center">
            <v-col cols="4">
              <v-btn v-if="isAdmin" density="compact" icon="fa-solid fa-pen-to-square" @click="editItem(item);"></v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn v-if="isAdmin" density="compact" icon="fa-solid fa-trash-can" @click="openDeleteDialog(item.id)"></v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn density="compact" icon="fa-solid fa-square-arrow-up-right" @click="requestDocument(item.id)"></v-btn>
            </v-col>


          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<style lang="scss" scoped>
.content-table,.register-button-container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}


</style>
