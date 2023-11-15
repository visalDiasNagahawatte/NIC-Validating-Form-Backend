module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true, // Add this line for auto-incrementing primary key
      primaryKey: true, // Mark as a primary key
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Users.associate = (models) => {
    Users.hasOne(models.UsersDetails, {
      foreignKey: {
        name: "userid",
        allowNull: false,
      },
      onDelete: "cascade",
    });
  };
  return Users;
};
