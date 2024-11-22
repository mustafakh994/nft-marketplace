   // src/router/index.js
   import { createRouter, createWebHistory } from 'vue-router';
   import NFTList from '@/views/NFTList.vue';

   const routes = [
     {
       path: '/',
       name: 'Home',
       component: NFTList,
     },
   ];

   const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
   });

   export default router;