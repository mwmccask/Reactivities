import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string
};

const ActivityForm:React.FC<RouteComponentProps<DetailParams>> = ({
    history,
    match
}) => {
    const activityStore = useContext(ActivityStore);
    const {
        activity: initialFormState,
        clearActivity,
        createActivity,
        editActivity,
        loadActivity,
        submitting,
        target
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id)
                .then(() => initialFormState && setActivity(initialFormState));
        }

        return () => clearActivity();
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);
    
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
                .then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            editActivity(activity)
                .then(() => history.push(`/activities/${activity.id}`));
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    return (
        <Grid>
            <Grid.Column widith={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            onChange={handleInputChange}
                            name='title'
                            placeholder='Title'
                            value={activity.title}
                        />
                        <Form.TextArea
                            onChange={handleInputChange}
                            name='description'
                            placeholder='Description'
                            rows={2}
                            value={activity.description}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name='category'
                            placeholder='Category'
                            value={activity.category}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name='date'
                            placeholder='Date'
                            type='datetime-local'
                            value={activity.date}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name='city'
                            placeholder='City'
                            value={activity.city}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name='venue'
                            placeholder='Venue'
                            value={activity.venue}
                        />
                        <Button
                            content='Submit'
                            floated='right'
                            loading={target === '' && submitting}
                            positive
                            type='submit'
                        />
                        <Button
                            content='Cancel'
                            floated='right'
                            onClick={() => history.push('/activities')}
                            type='button'
                        />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityForm);
