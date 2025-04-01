import { Request, Response } from "express";
import { SellService } from "../../infrastructure/services/sell-service";
import { SaveSell } from "../../application/use-cases/sell/save";
import { UpdateSell } from "../../application/use-cases/sell/update";
import { FindOneSell } from "../../application/use-cases/sell/find-one";
import { FindAllSells } from "../../application/use-cases/sell/find-all";

const sellService = new SellService();
const saveSell = new SaveSell(sellService);
const updateSell = new UpdateSell(sellService);
const findSell = new FindOneSell(sellService);
const findAllSells = new FindAllSells(sellService);

export class SellController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      const sell = req.body;
      const newSell = await saveSell.execute(sell);

      res.status(200).json(newSell);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const sell = req.body;
      const updatedSell = await updateSell.execute(sell);
      res.status(200).json(updatedSell);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedSell = await findSell.execute(id);

      if (!findedSell) {
        const { status, json } = this.handleError(
          new Error("Venta no encontrada")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedSell);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const sells = await findAllSells.execute();
      res.status(200).json(sells);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
