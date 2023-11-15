module.exports = (sequelize, DataTypes) => {
  const UsersDetails = sequelize.define("UsersDetails", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // // Define the foreign key relationship with the Users table
  // UsersDetails.belongsTo(sequelize.models.Users, {
  //   foreignKey: {
  //     name: "userid",
  //     allowNull: false,
  //   },
  //   onDelete: "CASCADE", // This determines the behavior of related records when a User record is deleted
  // });

  return UsersDetails;
};
