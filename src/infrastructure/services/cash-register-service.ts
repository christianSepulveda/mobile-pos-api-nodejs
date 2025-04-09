import { CashRegister } from "../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../domain/repositories/cash-register-repository";
import CashRegisterModel from "../database/models/cash-register";

export class CashRegisterService implements CashRegisterRepository {
  async save(cashRegister: CashRegister): Promise<CashRegister> {
    const newCashRegister = await CashRegisterModel.create(cashRegister);
    return newCashRegister;
  }

  async update(cashRegister: CashRegister): Promise<CashRegister> {
    const condition = { where: { id: cashRegister.id } };

    const findedCashRegister = await CashRegisterModel.findOne(condition);
    if (!findedCashRegister) throw new Error("El registro de caja no existe");

    const updatedCashRegister = await CashRegisterModel.update(
      cashRegister,
      condition
    );

    if (!updatedCashRegister)
      throw new Error("Error al actualizar el registro de caja");

    return cashRegister;
  }

  async findOne(id: string): Promise<CashRegister | undefined> {
    const condition = { where: { id } };
    const cashRegisterExists = await CashRegisterModel.findOne(condition);
    return cashRegisterExists ?? undefined;
  }

  async findAll(companyid: string): Promise<CashRegister[]> {
    const condition = { where: { companyid } };
    const cashRegisters = await CashRegisterModel.findAll(condition);
    return cashRegisters;
  }
}
