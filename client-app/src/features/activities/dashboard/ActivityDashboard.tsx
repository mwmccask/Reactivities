import React, { SyntheticEvent } from 'react'
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import { Grid } from 'semantic-ui-react';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    editActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    editMode: boolean;
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    submitting: boolean;
    target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    selectActivity={selectActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                { selectedActivity && !editMode && (
                    <ActivityDetails
                        activity={selectedActivity}
                        setEditMode={setEditMode}
                        setSelectedActivity={setSelectedActivity}
                        submitting={submitting}
                    />
                )}
                { editMode && (
                    <ActivityForm
                        activity={selectedActivity!}
                        createActivity={createActivity}
                        editActivity={editActivity}
                        key={(selectedActivity && selectedActivity.id) || 0}
                        setEditMode={setEditMode}
                        submitting={submitting}
                    />
                )}
            </Grid.Column>
        </Grid>
    )
};

export default ActivityDashboard;
