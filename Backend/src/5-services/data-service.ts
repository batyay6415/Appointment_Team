import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import TeamModel from "../2-models/team-model";
import { ResourceNotFoundError } from "../2-models/client-errors";
import AppointmentModel from "../2-models/appointment-model";
import { ValidationError } from "../2-models/client-errors";

async function getAllTeam(): Promise<TeamModel[]> {

    const sql = `SELECT * FROM team`;

    const team = await dal.execute(sql);

    return team;
}

async function getAllAppointmentByTeam(id: number): Promise<AppointmentModel[]> {

    const sql = `SELECT appointment.* , team.teamName 
                     FROM appointment
                     INNER JOIN team ON appointment.teamId = team.teamId
                     WHERE appointment.teamId = ? `;

    const appointment = await dal.execute(sql, [id]);

    if (!id) throw new ResourceNotFoundError(id);

    return appointment;

}

async function addNewAppointment(appointment: AppointmentModel): Promise<AppointmentModel> {

    if(checkAppointment)
    throw new ValidationError("This Date is taken")
    
    const sql = `INSERT INTO appointment VALUES(DEFAULT , ?, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql, [appointment.teamId,
    appointment.startDateTime, appointment.endDateTime, appointment.description, appointment.room]);

    result.insertId = appointment.appointmentId;

    return appointment;

}
async function checkAppointment(appointment: AppointmentModel): Promise<boolean> {

    const sql = `SELECT *
    FROM appointment
    WHERE teamId = ?
        AND (? <= endDateTime AND ? >= startDateTime)
        LIMIT 0, 25;`;

    const appointments = await dal.execute(sql, [appointment.teamId, appointment.endDateTime, appointment.startDateTime])

    return appointments.length > 0; // TRUE.
    

}

async function deleteAppointment(id: number): Promise<void> {

    const sql = `DELETE FROM appointment WHERE appointmentId = ?`

    await dal.execute(sql , [id]);

}


export default {
    getAllTeam,
    getAllAppointmentByTeam,
    addNewAppointment,
    deleteAppointment
};

