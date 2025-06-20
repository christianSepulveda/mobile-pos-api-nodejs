import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class UserModel extends Model {
  public id!: string;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public companyid!: string;
  public active!: boolean;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
    companyid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default UserModel;
