import React, { useState, FormEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

const ActivityForm:React.FC<IProps> = ({
    activity: initialFormState,
    setEditMode,
    createActivity,
    editActivity
}) => {
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
                    name='title'
                    placeholder='Title'
                    value={activity.title}
                    onChange={handleInputChange}
                />
                <Form.TextArea rows={2}
                    name='description'
                    placeholder='Description'
                    value={activity.description}
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='category'
                    placeholder='Category'
                    value={activity.category}
                    onChange={handleInputChange}
                />
                <Form.Input type='datetime-local'
                    name='date'
                    placeholder='Date'
                    value={activity.date}
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='city'
                    placeholder='City'
                    value={activity.city}
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='venue'
                    placeholder='Venue'
                    value={activity.venue}
                    onChange={handleInputChange}
                />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel' onClick={() => setEditMode(false)}/>
            </Form>
        </Segment>
    )
};

export default ActivityForm;
