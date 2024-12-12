import express, { Request, Response } from "express";
import { OutgoingController } from "../controllers/OutgoingController";
import { Ioutgoing } from "../domain/interfaces/Ioutgoing.interface";

// JWT Verifier Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body Parser (Read JSON from Body in Requests)
import bodyParser from 'body-parser';

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let outgoingRouter = express.Router();

outgoingRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Get all outgoing for a specific user (assuming you're passing user ID in query)
        const userId: string | undefined = req.query.userId as string | undefined;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        if (userId) {
            const controller: OutgoingController = new OutgoingController();
            const outgoing: Ioutgoing[] = await controller.getOutgoings(pageNumber,pageLimit,userId);
            return res.status(200).send(outgoing);
        } else {
            return res.status(400).send({
                message: 'User ID is missing from the query.'
            });
        }
    });

outgoingRouter.route('/:id')
    .get(verifyToken, async (req: Request, res: Response) => {
        const userId: string  = req.query.userId as string;
        const pageNumber: number  = req.query.userId as any ;
        const pageLimit: number = req.query.userId as any ;

        const controller: OutgoingController = new OutgoingController();
        const outgoing: Ioutgoing | null = await controller.getOutgoingByID(pageNumber,pageLimit,userId);

        if (outgoing) {
            return res.status(200).send(outgoing);
        } else {
            return res.status(404).send({
                message: 'outgoing not found.'
            });
        }
    })
    .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const outgoingId: any = req?.query?.id;
        const updateOutgoingData: Ioutgoing = req.body;

        const controller: OutgoingController = new OutgoingController();
        const updatedOutgoing: Ioutgoing | null = await controller.updateOutgoing(outgoingId, updateOutgoingData);

        if (updatedOutgoing) {
            return res.status(200).send(updatedOutgoing);
        } else {
            return res.status(404).send({
                message: 'outgoing not found.'
            });
        }
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        const outgoingId: any = req?.query.id;

        const controller: OutgoingController = new OutgoingController();
        const deletionResult: boolean = await controller.deleteOutgoing(outgoingId);

        if (deletionResult) {
            return res.status(200).send({
                message: 'outgoing deleted successfully.'
            });
        } else {
            return res.status(404).send({
                message: 'outgoing not found.'
            });
        }
    });

outgoingRouter.route('/create')
    .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
        const newOutgoingData: Ioutgoing = req.body;

        const controller: OutgoingController = new OutgoingController();
        const createdOutgoing: Ioutgoing = await controller.addOutgoing(newOutgoingData);

        return res.status(201).send(createdOutgoing);
    });
    
export default outgoingRouter;
