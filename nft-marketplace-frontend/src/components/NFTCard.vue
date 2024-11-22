<template>
    <v-card class="nft-card">
      <v-img :src="nft.image" height="200px" class="nft-image"></v-img>
      <v-card-title class="nft-title">{{ nft.name }}</v-card-title>
      <v-card-subtitle class="nft-price">{{ nft.price }} ETH</v-card-subtitle>
      <v-card-actions>
        <v-btn class="purchase-button">Purchase</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      nft: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .nft-card {
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #ffffff;
  }
  
  .nft-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .nft-image {
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .nft-title {
    font-weight: 500; /* Medium weight for better readability */
    font-size: 1.2em;
    margin: 10px 16px;
    color: #333333;
  }
  
  .nft-price {
    color: #555555;
    font-size: 1em;
    margin: 0 16px 10px;
    font-weight: bold; /* Bold font for price */
  }
  
  .purchase-button {
    margin: 10px 16px;
    background-color: #ff9800;
    color: white;
    font-weight: bold;
    width: 100%;
    transition: background-color 0.3s;
  }
  
  .purchase-button:hover {
    background-color: #e68900;
  }
  </style>