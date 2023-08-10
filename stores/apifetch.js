import { defineStore } from 'pinia'

export const useApiStore = defineStore('apifetch', {
    state: () => ({
        userData: {
            firstName: '',
            lastName: '',
            department: '',
            userType: ''
        }
    }),
    actions: {
        setUserData(data) {
            this.userData = data;
        }
    }
})
