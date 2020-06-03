export interface IActivity {
    attendees: IAttendee[];
    category: string;
    city: string;
    date: Date;
    description: string;
    id: string;
    isGoing: boolean;
    isHost: boolean;
    title: string;
    venue: string;
};

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
};

export class ActivityFormValues implements IActivityFormValues {
    category: string = '';
    city: string = '';
    date?: Date = undefined;
    description: string = '';
    id?: string = undefined;
    time?: Date = undefined;
    title: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        Object.assign(this, init);
        if (init && init.date) {
            this.time = init.date;
        }
    }
};

export interface IAttendee {
    displayName: string;
    image: string;
    isHost: boolean;
    username: string;
};
