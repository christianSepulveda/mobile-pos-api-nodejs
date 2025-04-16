import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class CashRegisterModel extends Model {
  public id!: string;
  public open_userid!: string;
  public open_date!: string;
  public open_time!: string;
  public open_cash!: number;

  public closing_userid!: string;
  public closing_date!: string;
  public closing_time!: string;

  public closing_cash!: number;
  public closing_debit!: number;
  public closing_credit!: number;
  public closing_transference!: number;

  public notes!: string;
  public active!: boolean;
  public companyid!: string;
}

CashRegisterModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    open_userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    closing_userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closing_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closing_cash: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    closing_debit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    closing_credit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    closing_transference: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    companyid: {
      type: DataTypes.STRING,
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
