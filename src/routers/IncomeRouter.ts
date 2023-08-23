import express, { Request, Response } from "express";
import { IncomeController } from "../controllers/IncomeController";
import { Iincome } from "../domain/interfaces/Iincome.interface";

// JWT Verifier Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body Parser (Read JSON from Body in Requests)
import bodyParser from 'body-parser';

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let incomeRouter = express.Router();

incomeRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Get all incomes for a specific user (assuming you're passing user ID in query)
        const userId: string | undefined = req.query.userId as string | undefined;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        if (userId) {
            const controller: IncomeController = new IncomeController();
            const incomes: Iincome[] = await controller.getIncomes(pageNumber,pageLimit,userId);
            return res.status(200).send(incomes);
        } else {
            return res.status(400).send({
                message: 'User ID is missing from the query.'
            });
        }
    });

incomeRouter.route('/:id')
    .get(verifyToken, async (req: Request, res: Response) => {
        const userId: string  = req.query.userId as string;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        const controller: IncomeController = new IncomeController();
        const income: Iincome | null = await controller.getIncomeByID(pageNumber,pageLimit,userId);

        if (income) {
            return res.status(200).send(income);
        } else {
            return res.status(404).send({
                message: 'Income not found.'
            });
        }
    })
    .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const incomeId: any = req?.query?.id;
        const updatedIncomeData: Iincome = req.body;

        const controller: IncomeController = new IncomeController();
        const updatedIncome: Iincome | null = await controller.updateIncome(incomeId, updatedIncomeData);

        if (updatedIncome) {
            return res.status(200).send(updatedIncome);
        } else {
            return res.status(404).send({
                message: 'Income not found.'
            });
        }
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        const incomeId: any = req?.query.id;

        const controller: IncomeController = new IncomeController();
        const deletionResult: boolean = await controller.deleteIncome(incomeId);

        if (deletionResult) {
            return res.status(200).send({
                message: 'Income deleted successfully.'
            });
        } else {
            return res.status(404).send({
                message: 'Income not found.'
            });
        }
    });

incomeRouter.route('/create')
    .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const newIncomeData: Iincome = req.body;

        const controller: IncomeController = new IncomeController();
        const createdIncome: Iincome = await controller.addIncome(newIncomeData);

        return res.status(201).send(createdIncome);
    });
    
export default incomeRouter;
