<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="5">
        <v-form ref="form">
          <v-text-field
            outlined
            :append-inner-icon="'fa-solid fa-magnifying-glass'"
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>