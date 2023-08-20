<script>
export default {
  data() {
    return {
      loggedInUser: {},
      documents: []
    };
  },
  async mounted() {
    this.loggedInUser = JSON.parse(localStorage.getItem('userData'));
    if (this.loggedInUser) {
      await this.fetchUserDocuments(this.loggedInUser.id);
    }
  },
  methods: {
    async fetchUserDocuments(userId) {
      try {
        const response = await fetch('https://docymento.onrender.com/api/v1/requests');
        const data = await response.json();
        this.documents = data.filter(doc => doc.userId === userId);
      } catch (error) {
        console.error('Error fetching user documents:', error);
      }
    },
    formatCreatedAt(createdAt) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const date = new Date(createdAt);
      return date.toLocaleDateString('en-US', options);
    }
  }
};
</script>
<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-card class="custom-card mx-auto">
        <v-card-title class="text-center m-5">
          <h3 class="text-center mb-4">Documentos en préstamo por </h3>
          <h4 class="text-center title"> {{ loggedInUser.firstName }} {{ loggedInUser.lastName }} </h4>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group v-if="documents.length">
              <v-list-item v-for="doc in documents" :key="doc.id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ doc.digitalDocumentRequest ? doc.digitalDocumentRequest.name : doc.physicalDocumentRequest.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ doc.digitalDocumentRequest ? 'Documento digital' : 'Documento físico' }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ formatCreatedAt(doc.createdAt) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <div v-if="!documents.length">
              No hay documentos solicitados por el usuario.
            </div>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>




<style lang="scss">
  .custom-card {
    width: 50%;
  }
  .title{
    text-transform: capitalize;
  }
</style>
