import React, { FormEvent, useState, useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activity: IActivity;
}

const ActivityForm:React.FC<IProps> = ({activity: initialFormState}) => {
    const activityStore = useContext(ActivityStore);
    const {cancelFormOpen, createActivity, editActivity, submitting, target} = activityStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    return (
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
                    onClick={cancelFormOpen}
                    type='button'
                />
            </Form>
        </Segment>
    )
};

export default observer(ActivityForm);
