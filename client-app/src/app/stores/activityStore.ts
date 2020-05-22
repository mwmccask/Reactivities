import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable editMode = false;
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array
            .from(this.activitiesRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    };

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

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
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
                this.selectedActivity = activity;
                this.editMode = false;
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
                if (this.selectedActivity?.id === id) {
                    this.selectedActivity = undefined;
                    this.editMode = false;
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

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    };

    @action cancelFormOpen = () => {
        this.editMode = false;
    };

    @action selectActivity = (id: string) => {
        this.selectedActivity =  this.activitiesRegistry.get(id);
        this.editMode = false;
    };
};

export default createContext(new ActivityStore());
