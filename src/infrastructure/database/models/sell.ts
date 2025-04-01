import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class SellModel extends Model {
  public id!: string;
  public date!: string;
  public time!: string;
  public total!: number;
  public userid!: string;
  public companyid!: string;
  public active!: boolean;
}

SellModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyid: {
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
    modelName: "Sell",
    tableName: "sells",
    timestamps: false,
  }
);

export default SellModel;
