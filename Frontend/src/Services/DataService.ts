import axios from "axios";
import AppointmentModel from "../Models/AppointmentModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/AppConfig";

class DataService {

    public async getAllTeams(): Promise<TeamModel[]> {

        const response = await axios.get<TeamModel[]>(appConfig.teamUrl);

        const teams = response.data;

        return teams;
    }

    public async getAllAppointmentByTeam(id: number): Promise<AppointmentModel[]> {

        const response = await axios.get<AppointmentModel[]>(appConfig.appointmentByTeamUrl + id);

        const appointment = response.data;

        return appointment;
    }

    public async addNewAppointment(appointment: AppointmentModel): Promise<void> {

        await axios.post<AppointmentModel>(appConfig.appointmentUrl, appointment);
    }

    public async deleteAppointment(id: number): Promise<void> {

        await axios.delete<AppointmentModel>(appConfig.appointmentUrl + id);
    }
}


const dataService = new DataService();

export default dataService;
