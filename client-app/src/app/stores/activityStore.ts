import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistry.values()));
    };

    groupActivitiesByDate(activities: IActivity[]) {
        return Object.entries(activities
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            .reduce((activities, activity) => {
                const date = activity.date.split('T')[0];
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
                    activity.date = activity.date.split('.')[0];
                    this.activitiesRegistry.set(activity.id, activity);
                });
            });
        } catch (error) {
            runInAction('load activity error', () => console.log(error));
        } finally {
            runInAction(() => this.loadingInitial = false);
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity){
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                });
            } catch (error) {
                runInAction('get activity failed', () => console.log(error))
            } finally {
                runInAction(() => this.loadingInitial = false);
            }
        }
    };

    @action clearActivity = () => {
        this.activity = null;
    };

    getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.activity = activity;
            });
        } catch (error) {
            runInAction('create activity error', () => console.log(error));
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
        } catch (error) {
            runInAction('edit activity error', () => console.log(error));
        } finally {
            runInAction(() => this.submitting = false);
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activitiesRegistry.delete(id);
                if (this.activity?.id === id) {
                    this.activity = null;
                }
            });
        } catch (error) {
            runInAction('delete activity error', () => console.log(error));
        } finally {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
        }
    };
};

export default createContext(new ActivityStore());
