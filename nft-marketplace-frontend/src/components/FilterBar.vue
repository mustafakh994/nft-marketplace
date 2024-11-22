vue
<template>
  <v-container class="filter-bar mb-4 py-3">
    <v-row>
      <v-col cols="12" class="mb-2">
        <v-select
          v-model="selectedType"
          :items="types"
          item-title="text"
          item-value="value"
          label="Filter by Type"
          outlined
          dense
          class="filter-select"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn @click="applyFilter" class="filter-button" block large>
          Apply Filter
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedType: null,
      types: [
        { text: "Image", value: "image" },
        { text: "Video", value: "video" },
      ],
    };
  },
  methods: {
    applyFilter() {
      const filters = {};
      if (this.selectedType) {
        filters.type = this.selectedType;
      }
      console.log("Applying filters:", filters);
      this.$emit("filter-changed", filters);
    },
    resetFilters() {
      this.selectedType = null;
      this.applyFilter();
    },
  },
  watch: {
    selectedType(newValue) {
      if (newValue === null) {
        this.applyFilter();
      }
    },
  },
};
</script>

<style scoped>
.filter-bar {
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-select {
  width: 100%;
}

.filter-button {
  background-color: #1976d2;
  color: white;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #155a8a;
}
</style>
