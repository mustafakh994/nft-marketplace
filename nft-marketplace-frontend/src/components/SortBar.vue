<template>
    <v-container class="sort-bar mb-4 py-3">
      <v-row>
        <v-col cols="12" class="mb-2">
          <v-select
            v-model="selectedSort"
            :items="sortOptions"
            label="Sort By"
            outlined
            dense
            class="sort-select"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-btn @click="applySort" class="sort-button" block large>
            Sort
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSort: null,
        sortOptions: ['Price: Low to High', 'Price: High to Low', 'Newest First'],
      };
    },
    methods: {
      applySort() {
        let sortBy = '';
        let order = '';
  
        switch (this.selectedSort) {
          case 'Price: Low to High':
            sortBy = 'price';
            order = 'asc';
            break;
          case 'Price: High to Low':
            sortBy = 'price';
            order = 'desc';
            break;
          case 'Newest First':
            sortBy = 'createdAt'; // Assuming 'createdAt' is the field for sorting by newest
            order = 'desc';
            break;
          default:
            sortBy = 'createdAt'; // Default sorting
            order = 'desc';
        }
  
        console.log('Emitting sort:', { sortBy, order }); // Debugging line
        this.$emit('sort-changed', { sortBy, order });
      },
    },
  };
  </script>
  
  <style scoped>
  .sort-bar {
    max-width: 800px; /* Set a maximum width for better control */
    margin: 0 auto; /* Center the sort bar */
    background-color: #f9f9f9; /* Light background for contrast */
    border-radius: 8px; /* Rounded corners for a softer look */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  
  .sort-select {
    width: 100%; /* Full width for the select */
  }
  
  .sort-button {
    background-color: #1976d2; /* Primary color */
    color: white; /* White text */
    transition: background-color 0.3s;
  }
  
  .sort-button:hover {
    background-color: #155a8a; /* Darker shade on hover */
  }
  </style>