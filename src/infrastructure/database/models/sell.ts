import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

export type Sell = {
  id?: string;
  date: string;
  time: string;
  total: number;
  cash: number;
  change: number;
  userid: string;
  payment_method: string;
  cash_register_id: string;
  companyid: string;
  active: boolean;
};

class SellModel extends Model<Sell> {
  public id!: string;
  public date!: string;
  public time!: string;
  public total!: number;
  public cash!: number;
  public change!: number;
  public userid!: string;
  public cash_register_id!: string;
  public payment_method!: string;
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
    cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    change: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cash_register_id: {
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
