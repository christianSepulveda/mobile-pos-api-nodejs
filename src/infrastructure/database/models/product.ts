import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class ProductModel extends Model {
  public id!: string;
  public name!: string;
  public price!: number;
  public code!: string;
  public category_id!: string;
  public companyid!: string;
  public active!: boolean;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
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
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);

export default ProductModel;
