import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class CashRegisterModel extends Model {
  public id?: string;
  public date!: string;
  public time!: string;
  public closing_time!: string;
  public userid!: string;
  public initial_cash!: number;
  public closing_cash!: number;
  public expected_cash!: number;
  public cash_difference!: number;
  public notes!: string;
  public total_sales!: number;
  public companyid!: string;
  public active!: boolean;
}

CashRegisterModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initial_cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    closing_cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expected_cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cash_difference: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_sales: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    modelName: "CashRegister",
    tableName: "cashregister",
    timestamps: false,
  }
);

export default CashRegisterModel;
