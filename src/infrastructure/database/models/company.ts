import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class CompanyModel extends Model {
  public id!: string;
  public name!: string;
  public rut!: string;
  public phoneNumber!: string;
  public email!: string;
  public expirationDate!: string;
  public monthlyPayment!: number;
  public active!: boolean;
}

CompanyModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthlyPayment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "Company",
    tableName: "companies",
    timestamps: false,
  }
);

export default CompanyModel;
