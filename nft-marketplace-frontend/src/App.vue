<template>
    <v-app>
      <v-container>
        <v-toolbar app flat>
          <v-toolbar-title>NFT Marketplace</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="goToHome" color="primary" dark>Home</v-btn>
        </v-toolbar>
  
        <v-main>
          <v-container fluid>
            <router-view />
          </v-container>
        </v-main>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    methods: {
      goToHome() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style>
  body {
    background-color: #f5f5f5; /* Light gray background */
    font-family: 'Roboto', sans-serif; /* Use Roboto font */
    margin: 0; /* Remove default margin */
  }
  
  .v-toolbar {
    background-color: #1976d2; /* Primary color for the toolbar */
    color: white; /* White text color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  
  .v-btn {
    margin-left: 10px; /* Space between buttons */
  }
  
  .v-container {
    padding: 0; /* Remove default padding */
  }
  
  .v-main {
    padding: 20px; /* Add padding for content */
    background-color: #ffffff; /* White background for main content */
    border-radius: 8px; /* Rounded corners for a modern look */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Light shadow for main content */
  }
  </style>