import AppointmentModel from "../../../Models/AppointmentModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./CardAppointment.css";

interface CardAppointmentProps {
	appointment: AppointmentModel;
}

function CardAppointment(props: CardAppointmentProps): JSX.Element {

    const startDate =  new Date(props.appointment.startDateTime); //To convert to Object
    const endDate = new Date(props.appointment.endDateTime);
      
      const startTimestamp = startDate.getTime();// To Convert This Object to numbers
      const endTimestamp = endDate.getTime();
      
      const durationInMilliseconds = endTimestamp - startTimestamp;
      const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      
      function deleteMe(id: number): void {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            dataService.deleteAppointment(id);
        }
        catch(err: any) {
            notifyService.error(err)
        }
      }
    return (
        <div className="CardAppointment">

			<span>{props.appointment.teamName}</span>
            <br />
            <span>From: {props.appointment.startDateTime.slice(0 , 16).replace('T' , ' ')}</span>
            <br />
            <span>To: {props.appointment.endDateTime.slice(0, 16).replace('T' , ' ')}</span>
            <br />
            <span>Description : {props.appointment.description}</span>
            <br />
            <span>Room: {props.appointment.room}</span>
            <br />
            <span>During:Duration:{hours} hours {minutes} minutes</span>
            <br />
            <span><button onClick={() => {deleteMe(props.appointment.appointmentId)}}>❌</button></span>

            
        </div>
    );
}

export default CardAppointment;
