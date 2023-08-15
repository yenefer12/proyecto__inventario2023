<template>
  <div>
    <v-table class="requests-table" fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.description }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tickets = ref([]);
const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');

const fetchTickets = async () => {
  try {
    const response = await fetch('https://docymento.onrender.com/api/v1/tickets');
    if (response.ok) {
      const ticketsData = await response.json();
      for (let ticket of ticketsData) {
        ticket.description = await generateDescription(ticket);
      }
      tickets.value = ticketsData;
    } else {
      console.error('Error fetching tickets:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

const getDepartmentNameById = async (id) => {
  try {
    const response = await fetch(`https://docymento.onrender.com/api/v1/departments/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data.name;
    }
    throw new Error('Error fetching department');
  } catch (error) {
    console.error(error);
    return '';
  }
};

const getDocumentNameById = async (id) => {
  try {
    const response = await fetch(`https://docymento.onrender.com/api/v1/physicalDocuments/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data.name;
    }
    throw new Error('Error fetching document');
  } catch (error) {
    console.error(error);
    return '';
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(`https://docymento.onrender.com/api/v1/users/${id}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Error fetching user');
  } catch (error) {
    console.error(error);
    return null;
  }
};
const generateDescription = async (ticket) => {
  const requester = await getUserById(ticket.ticketPhysicalDocument.idUser);
  if (!requester) return ''; // Handle the case where user info couldn't be fetched
  const departmentName = await getDepartmentNameById(requester.department); // Use the department of the requester, not the logged in user
  const documentName = await getDocumentNameById(ticket.idPhysicalDocument);
  return `El usuario ${requester.firstName} ${requester.lastName} del departamento ${departmentName} ha solicitado el documento ${documentName} con el id ${ticket.idPhysicalDocument}`;
};



onMounted(fetchTickets);
</script>

<style scoped>
.requests-table {
  width: 100%;
}
</style>
