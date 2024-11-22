import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/nfts";

export default {
  async getAllNFTs(queryParams) {
    try {
      // Format the query parameters
      const formattedParams = {
        page: parseInt(queryParams.page) || 1,
        limit: parseInt(queryParams.limit) || 10,
        sortBy: queryParams.sortBy,
        order: queryParams.order,
      };

      // Add type filter if present
      if (queryParams.type) {
        formattedParams.type = queryParams.type;
      }

      console.log("Sending request with params:", formattedParams);

      const response = await axios.get(API_URL, {
        params: formattedParams,
      });

      console.log("API Response:", response.data);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getNFTById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  createNFT(nftData) {
    return axios.post(API_URL, nftData);
  },
  updateNFT(id, nftData) {
    return axios.put(`${API_URL}/${id}`, nftData);
  },
  deleteNFT(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
