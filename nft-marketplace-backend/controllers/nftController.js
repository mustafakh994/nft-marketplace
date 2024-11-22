// controllers/nftController.js
const db = require('../models');
const NFT = db.NFT;
const Op = db.Sequelize.Op;

// Create and Save a new NFT
exports.createNFT = async (req, res) => {
  try {
    const { title, price, currency, image, type } = req.body;

    // Validate request
    if (!title || !price || !currency || !image || !type) {
      return res.status(400).send({ message: 'Content cannot be empty!' });
    }

    // Create an NFT
    const nft = { title, price, currency, image, type };

    // Save NFT in the database
    const data = await NFT.create(nft);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the NFT.',
    });
  }
};

// Retrieve all NFTs from the database with filters, sorting, pagination
exports.getAllNFTs = async (req, res) => {
  try {
    let { type, minPrice, maxPrice, sortBy, order, limit, page } = req.query;

    const condition = {};

    // Filtering
    if (type) {
      condition.type = type;
    }

    if (minPrice || maxPrice) {
      condition.price = {};
      if (minPrice) condition.price[Op.gte] = minPrice;
      if (maxPrice) condition.price[Op.lte] = maxPrice;
    }

// Sorting
    let orderArray = [];
    if (sortBy) {
      orderArray.push([sortBy, order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
    }

    // Pagination
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    const offset = (page - 1) * limit;

    const data = await NFT.findAndCountAll({
      where: condition,
      order: orderArray.length ? orderArray : [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.status(200).send({
      totalItems: data.count,
      nfts: data.rows,
      totalPages: Math.ceil(data.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while retrieving NFTs.',
    });
  }
};

// Find a single NFT by Id
exports.getNFTById = async (req, res) => {
  try {
    const id = req.params.id;
    const nft = await NFT.findByPk(id);

    if (!nft) {
      return res.status(404).send({ message: `NFT with id=${id} not found.` });
    }

    res.status(200).send(nft);
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving NFT with id=${req.params.id}`,
    });
  }
};

// Update an NFT by the id in the request
exports.updateNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await NFT.update(req.body, {
      where: { id },
    });

    if (num == 1) {
      res.send({
        message: 'NFT was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update NFT with id=${id}. Maybe NFT was not found or req.body is empty.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Error updating NFT with id=${req.params.id}`,
    });
  }
};

// Delete an NFT with the specified id in the request
exports.deleteNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await NFT.destroy({
      where: { id },
    });

    if (num == 1) {
      res.send({
        message: 'NFT was deleted successfully!',
      });
    } else {
      res.send({
        message: `Cannot delete NFT with id=${id}. Maybe NFT was not found.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Could not delete NFT with id=${req.params.id}`,
    });
  }
};