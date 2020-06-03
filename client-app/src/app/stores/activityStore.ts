import { action, computed, observable, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { SetActivityProps, CreateAttendee } from '../common/util/util';

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistry.values()));
    };

    groupActivitiesByDate(activities: IActivity[]) {
        return Object.entries(activities
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .reduce((activities, activity) => {
                const date = activity.date.toISOString().split('T')[0];
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.activitiesRegistry.clear();
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    SetActivityProps(activity, this.rootStore.userStore.user!);
                    this.activitiesRegistry.set(activity.id, activity);
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loadingInitial = false);
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            runInAction(() => this.activity = activity);
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = SetActivityProps(activity, this.rootStore.userStore.user!);
                    this.activitiesRegistry.set(activity.id, activity);
                });
                return activity;
            } catch (error) {
                console.log(error);
            } finally {
                runInAction(() => this.loadingInitial = false);
            }
        }
    };

    @action clearActivity = () => {
        this.activity = null;
    };

    getActivity = (id: string): IActivity => {
        return this.activitiesRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attendee = CreateAttendee(this.rootStore.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
            activity.isHost = true;
            runInAction('creating activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.activity = activity;
            });
            history.push(`/activities/${activity.id}`);
        } catch (error) {
            toast.error('Problem submitting data');
            console.log(error.response);
        } finally {
            runInAction(() => this.submitting = false);
        }
    };
    
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.activity = activity;
            });
            history.push(`/activities/${activity.id}`);
        } catch (error) {
            toast.error('Problem submitting data');
            console.log(error.response);
        } finally {
            runInAction(() => this.submitting = false);
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => this.activitiesRegistry.delete(id));
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
        }
    };

    @action attendActivity = async () => {
        const attendee = CreateAttendee(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity!.id);
            runInAction('attending activity', () => {
                if (this.activity) {
                    this.activity!.attendees.push(attendee);
                    this.activity!.isGoing = true;
                    this.activitiesRegistry.set(this.activity!.id, this.activity);
                }
            });
        } catch (error) {
            toast.error('Problem signing up to activity');
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    };

    @action cancelAttendence = async () => {
        const attendee = CreateAttendee(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.unattend(this.activity!.id);
            runInAction('canceling attendance', () => {
                if (this.activity) {
                    this.activity!.attendees = this.activity!.attendees.filter(a => a.username !== attendee!.username);
                    this.activity!.isGoing = false;
                    this.activitiesRegistry.set(this.activity!.id, this.activity);
                }
            });
        } catch (error) {
            toast.error('Problem canceling attendance');
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    };
};
