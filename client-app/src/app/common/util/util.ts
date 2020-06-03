import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const timeString = `${hour}:${minutes}:00`;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(`${dateString} ${timeString}`);
};

export const SetActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(a => a.username === user.username);
    activity.isHost = activity.attendees.some(a => a.username === user.username && a.isHost);
    return activity;
};

export const CreateAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        image: user.image!,
        isHost: false,
        username: user.username
    }
};
