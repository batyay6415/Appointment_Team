class AppointmentModel {

    public appointmentId: number;
    public teamId: number;
    public startDateTime: string;
    public endDateTime: string;
    public description: string;
    public room: string;

    public constructor(appointment: AppointmentModel) {
        this.appointmentId = appointment.appointmentId;
        this.teamId = appointment.teamId;
        this.startDateTime = appointment.startDateTime;
        this.endDateTime = appointment.endDateTime;
        this.description = appointment.description;
        this.room = appointment.room;
    }
}

export default AppointmentModel;