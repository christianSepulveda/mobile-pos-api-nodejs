import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

export type CashMovementType = "INCOME" | "EXPENSE";

class CashMovementModel extends Model {
  public id!: string;
  public date!: string;
  public time!: string;
  public amount!: number;
  public cashRegisterId!: string;
  public type!: CashMovementType;
  public note?: string;
  public userId!: string;
}

CashMovementModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cashRegisterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("INCOME", "EXPENSE"),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "CashMovement",
    tableName: "cashmovements",
    timestamps: false,
  }
);

export default CashMovementModel;
