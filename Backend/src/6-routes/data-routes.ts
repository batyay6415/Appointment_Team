import express, { Request, Response, NextFunction } from "express";
import AppointmentModel from "../2-models/appointment-model";
import dataService from "../5-services/data-service";

const router = express.Router();

//GET http://localhost:4000/api/team
router.get("/team", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const team = await dataService.getAllTeam();
        response.json(team);
    }
    catch (err: any) {
        next(err);
    }
});

//GET http://localhost:4000/api/appointment-by-team/:id
router.get("/appointment-by-team/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const appointment = await dataService.getAllAppointmentByTeam(id);
        response.json(appointment);
    }
    catch (err: any) {
        next(err);
    }
});

//POST http://localhost:4000/api/appointment
router.post("/appointment", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const appointment = new AppointmentModel(request.body);
        const addedAppointment = await dataService.addNewAppointment(appointment);
        response.status(201).json(addedAppointment);
    }
    catch (err: any) {
        next(err);
    }
});

//DELETE http://localhost:4000/api/appointment/:id
router.delete("/appointment/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteAppointment(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
