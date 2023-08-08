import { defineStore } from 'pinia'

export const useApiStore = defineStore('apifetch', () => {

    const userData = ref({
      firstName: '',
      lastName: '',
      department: '',
      userType: '',
    });
    
    
    return {userData}
  
  })