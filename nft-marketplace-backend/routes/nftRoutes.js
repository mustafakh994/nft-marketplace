// routes/nftRoutes.js
const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');

// Create a new NFT
router.post('/', nftController.createNFT);

// Retrieve all NFTs with optional filters, sorting, and pagination
router.get('/', nftController.getAllNFTs);

// Retrieve a single NFT by id
router.get('/:id', nftController.getNFTById);

// Update an NFT by id (optional)
router.put('/:id', nftController.updateNFT);

// Delete an NFT by id (optional)
router.delete('/:id', nftController.deleteNFT);

module.exports = router;