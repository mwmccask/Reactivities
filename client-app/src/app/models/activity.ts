export interface IActivity {
    category: string;
    city: string;
    date: Date;
    description: string;
    id: string;
    title: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

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
        if (init && init.date) {
            init.time = init.date;
        }
        Object.assign(this, init);
    }
}
