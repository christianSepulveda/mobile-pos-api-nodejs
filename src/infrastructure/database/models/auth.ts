import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class AuthModel extends Model {
  public id!: string;
  public authtoken!: string;
  public deviceinfo!: string;
  public refreshtoken!: string;
  public active!: boolean;
}

AuthModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    authtoken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceinfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshtoken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: instance,
    modelName: "Auth",
    tableName: "auth",
    timestamps: false,
  }
);

export default AuthModel;
