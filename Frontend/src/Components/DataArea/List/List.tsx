import { ChangeEvent, useEffect, useState } from "react";
import AppointmentModel from "../../../Models/AppointmentModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import CardAppointment from "../CardAppointment/CardAppointment";
import "./List.css";

function List(): JSX.Element {

    const [team, setTeam]  = useState<TeamModel[]>([]);
    const[appointment, setAppointment] = useState<AppointmentModel[]>([]);


    useEffect(() => {
        dataService.getAllTeams()
        .then(dbTeam => setTeam(dbTeam))
        .catch(err => notifyService.error(err));
    } , [])

    function getAppointment(args: ChangeEvent<HTMLSelectElement>){
        const id = +args.target.value;
        dataService.getAllAppointmentByTeam(id)
        .then(dbAppointment => setAppointment(dbAppointment))
        .catch(err => notifyService.error(err));
    }
    return (
        <div className="List">
			<select defaultValue="" onChange={getAppointment}>
                <option disabled value="">Team Calendar</option>
                {team.map((t) => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
            </select>
            <br />
            <br />
            {appointment.map((a) => <CardAppointment key={a.appointmentId} appointment={a} /> )}
        </div>
    );
}

export default List;
