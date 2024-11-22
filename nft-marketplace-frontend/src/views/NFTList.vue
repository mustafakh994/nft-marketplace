<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar for Filters and Sorting -->
      <v-col cols="12" md="3" class="sidebar">
        <v-card class="sidebar-card">
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <FilterBar @filter-changed="onFilterChanged" />
          </v-card-text>
        </v-card>
        <v-card class="sidebar-card">
          <v-card-title>Sorting</v-card-title>
          <v-card-text>
            <SortBar @sort-changed="onSortChanged" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row class="nft-list" justify="center">
          <v-col
            v-for="nft in nfts"
            :key="nft.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <NFTCard :nft="nft" />
          </v-col>
        </v-row>

        <!-- Modified Pagination -->
        <v-row v-if="totalPages > 0">
          <v-col cols="12" class="pagination">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              @click="handlePageClick"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NFTCard from "@/components/NFTCard.vue";
import FilterBar from "@/components/FilterBar.vue";
import SortBar from "@/components/SortBar.vue";
import nftService from "@/services/nftService";

export default {
  name: "NFTList",
  components: {
    NFTCard,
    FilterBar,
    SortBar,
  },
  data() {
    return {
      nfts: [],
      totalPages: 0,
      currentPage: 1,
      filters: {},
      sort: {},
    };
  },
  methods: {
    async fetchNFTs() {
      try {
        const queryParams = {
          page: this.currentPage,
          limit: 10,
          sortBy: this.sort.sortBy || "createdAt",
          order: this.sort.order || "desc",
          ...this.filters,
        };

        console.log("Fetching NFTs with params:", queryParams);

        const response = await nftService.getAllNFTs(queryParams);

        if (response.data) {
          this.nfts = response.data.nfts;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;
          console.log("Fetched NFTs:", this.nfts.length);
          console.log("Total pages:", this.totalPages);
          console.log("Current page:", this.currentPage);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    },

    handlePageClick() {
      console.log("Page clicked, new page:", this.currentPage);
      this.fetchNFTs();
    },

    onFilterChanged(filters) {
    console.log('Filters received:', filters);
    this.filters = filters;
    this.currentPage = 1; // Reset to first page when applying filters
    this.fetchNFTs();
},

    onSortChanged(sort) {
      this.sort = sort;
      this.currentPage = 1;
      this.fetchNFTs();
    },
  },
  mounted() {
    console.log("Component mounted");
    this.fetchNFTs();
  },
};
</script>
<style scoped>
.sidebar {
  padding: 10px;
}

.sidebar-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.nft-list {
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
