import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class SellDetailModel extends Model {
  public id!: string;
  public sellid!: string;
  public productid!: string;
  public quantity!: number;
  public total!: number;
}

SellDetailModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sellid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "SellDetail",
    tableName: "selldetails",
    timestamps: false,
  }
);

export default SellDetailModel;
