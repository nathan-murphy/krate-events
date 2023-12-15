import * as express from "express";
import * as mongodb from "mongodb";

import { samplePotlucks } from "./samplePotlucks";
 
export const potluckRouter = express.Router();
potluckRouter.use(express.json());

let allPotlucks = samplePotlucks;

potluckRouter.get('/', (req, res) => {
    res.status(200).send(allPotlucks);
})

potluckRouter.post('/', (req, res) => {
    allPotlucks.push(req.body);
    res.sendStatus(201);
})