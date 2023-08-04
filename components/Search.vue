<script setup>
import { ref } from "vue";
const emit = defineEmits(["search"]);
const searchInput = ref("");

const submitSearch = () => {
  emit("search", searchInput.value);
};

const onInput = () => {
  emit("search", searchInput.value);
};
</script>
<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="5">
        <v-form @submit.prevent="submitSearch">
          <v-text-field
            v-model="searchInput"
            outlined
            :append-inner-icon="'fa-solid fa-magnifying-glass'"
            required
            @input="onInput"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
