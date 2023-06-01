import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppointmentModel from "../../../Models/AppointmentModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {
  const { register, handleSubmit } = useForm<AppointmentModel>();
  const [team, setTeam] = useState<TeamModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dataService
      .getAllTeams()
      .then((dbTeam) => setTeam(dbTeam))
      .catch((err) => notifyService.error(err));
  }, []);

  function addAppointment(appointment: AppointmentModel): void {
    const now = new Date().toISOString().slice(0, 10);
    if (appointment.startDateTime < now) {
      notifyService.error("The Date passed");
      return;
    }
    if(appointment.endDateTime < appointment.startDateTime) {
        notifyService.error("Start Date must be early than End Date")
        return;
    }
    dataService
      .addNewAppointment(appointment)
      .then(() => {
        notifyService.success("Appointment has been added!!!");
        navigate("/list");
      })
      .catch((err) => notifyService.error(err));
  }

  return (
    <div className="Insert">
      <form onSubmit={handleSubmit(addAppointment)}>
        <label>Team</label>
        <select defaultValue="" {...register("teamId")} required>
          <option disabled value="">
            Team Calendar
          </option>
          {team.map((t) => (
            <option key={t.teamId} value={t.teamId}>
              {t.teamName}
            </option>
          ))}
        </select>

        <label>Start Date-Time:</label>
        <input type="datetime-local" {...register("startDateTime")} required />

        <label>End Date-Time:</label>
        <input type="datetime-local" {...register("endDateTime")} required />

        <label>Description:</label>
        <input type="text" {...register("description")} required />

        <label>Room</label>
        <input type="text" {...register("room")} required />
        <br />
        <br />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Insert;
