import * as express from "express";
import * as mongodb from "mongodb";

import { samplePotlucks } from "./samplePotlucks";
 
export const potluckRouter = express.Router();
potluckRouter.use(express.json());

let allPotlucks = samplePotlucks;

potluckRouter.get('/', (req, res) => {
    res.status(200).send(allPotlucks);
})

potluckRouter.get('/:id', (req, res) => {
    let p = allPotlucks.filter(p => p._id.toString() == req.params.id)
    res.status(200).send(p[0])
})

potluckRouter.post('/', (req, res) => {
    allPotlucks.push(req.body);
    res.sendStatus(201);
})