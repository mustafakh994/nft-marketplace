module.exports = (sequelize, Sequelize) => {
  const NFT = sequelize.define('nft', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('image', 'video'),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: true,
    updatedAt: false, 
  });
  
  return NFT;
  };