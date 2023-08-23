import express, { Request, Response } from "express";
import { GoalController } from "../controllers/GoalController";
import { Igoal } from "../domain/interfaces/Igoal.interface";

// JWT Verifier Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body Parser (Read JSON from Body in Requests)
import bodyParser from 'body-parser';

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let goalRouter = express.Router();

goalRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Get all goals for a specific user (assuming you're passing user ID in query)
        const userId: string | undefined = req.query.userId as string | undefined;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        if (userId) {
            const controller: GoalController = new GoalController();
            const goals: Igoal[] = await controller.getGoals(pageNumber,pageLimit,userId);
            return res.status(200).send(goals);
        } else {
            return res.status(400).send({
                message: 'User ID is missing from the query.'
            });
        }
    });

goalRouter.route('/:id')
    .get(verifyToken, async (req: Request, res: Response) => {
        const userId: string  = req.query.userId as string;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        const controller: GoalController = new GoalController();
        const goal: Igoal | null = await controller.getGoalByID(pageNumber,pageLimit,userId);

        if (goal) {
            return res.status(200).send(goal);
        } else {
            return res.status(404).send({
                message: 'Goal not found.'
            });
        }
    })
    .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const goalId: any = req?.query?.id;
        const updatedGoalData: Igoal = req.body;

        const controller: GoalController = new GoalController();
        const updatedGoal: Igoal | null = await controller.updateGoal(goalId, updatedGoalData);

        if (updatedGoal) {
            return res.status(200).send(updatedGoal);
        } else {
            return res.status(404).send({
                message: 'Goal not found.'
            });
        }
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        const goalId: any = req?.query.id;

        const controller: GoalController = new GoalController();
        const deletionResult: boolean = await controller.deleteGoal(goalId);

        if (deletionResult) {
            return res.status(200).send({
                message: 'Goal deleted successfully.'
            });
        } else {
            return res.status(404).send({
                message: 'Goal not found.'
            });
        }
    });

goalRouter.route('/create')
    .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const newGoalData: Igoal = req.body;

        const controller: GoalController = new GoalController();
        const createdGoal: Igoal = await controller.addGoal(newGoalData);

        return res.status(201).send(createdGoal);
    });
    
export default goalRouter;
