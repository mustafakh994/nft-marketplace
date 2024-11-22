const { Sequelize, DataTypes } = require('sequelize');
const { faker } = require('@faker-js/faker');
const path = require('path');

// ----------------- Configuration ----------------- //

const configPath = path.resolve(__dirname, '..', 'config', 'db.config.js');
const config = require(configPath);

// Initialize Sequelize with db.config.js
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  user: config.USER,
  db: config.DB,
  password: config.PASSWORD,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: false, // Disable logging; set to true to see SQL queries
});

// ----------------- Define the NFT Model ----------------- //
const NFT = sequelize.define(
  'nft',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'nfts',
    timestamps: false,  // Disable automatic timestamp fields if not using updatedAt
  }
);

// ----------------- Data Generation ----------------- //
const currencies = ['USDT', 'ETH', 'BTC', 'DAI', 'USDC'];
const imageBaseURLs = [
  'https://via.placeholder.com/400x400.png?text=NFT+Image+1',
];
const videoBaseURLs = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4',
];

const usedTitles = new Set();

// Function to generate a single NFT entry
const generateNFT = () => {
  let title;
  // Ensure unique titles (optional)
  do {
    title = faker.commerce.productName();
  } while (usedTitles.has(title));
  usedTitles.add(title);

  const type = faker.helpers.arrayElement(['image', 'video']);
  const currency = faker.helpers.arrayElement(currencies);

  let imageUrl = '';
  if (type === 'image') {
    imageUrl = faker.helpers.arrayElement(imageBaseURLs);
  } else if (type === 'video') {
    imageUrl = faker.helpers.arrayElement(videoBaseURLs);
  }

  return {
    title: title,
    price: parseFloat(faker.commerce.price(0.1, 1000, 2)),
    currency: currency,
    image: imageUrl,
    type: type,
    createdAt: faker.date.past(1),
  };
};

// ----------------- Seeder Function ----------------- //
const seedNFTs = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // Sync the model (ensure the table exists)
    await NFT.sync({ alter: true }); // Use { force: true } to drop and recreate the table
    console.log('🗃️ NFT table synced.');



    // Generate 150 NFT entries
    const nftData = [];
    for (let i = 0; i < 150; i++) {
      nftData.push(generateNFT());
    }

    // Bulk insert the NFT data
    await NFT.bulkCreate(nftData);
    console.log('✅ 150 NFTs have been successfully seeded.');

    // Close the database connection
    await sequelize.close();
    console.log('🔒 Database connection closed.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

// Execute the seeder
seedNFTs();