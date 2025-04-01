import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class CategoryModel extends Model {
  public id!: string;
  public name!: string;
  public companyid!: string;
  public active!: boolean;
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
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
    },
  },
  {
    sequelize: instance,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);

export default CategoryModel;