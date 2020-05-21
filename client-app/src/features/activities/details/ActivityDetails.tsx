import React from 'react';
import { IActivity } from '../../../app/models/activity';
import { Button, Card, Image } from 'semantic-ui-react';

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    submitting: boolean;
}

const ActivityDetails: React.FC<IProps> = ({
    activity,
    setEditMode,
    setSelectedActivity,
    submitting
}) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        basic
                        color='blue'
                        content='Edit'
                        onClick={() => setEditMode(true)}
                    />
                    <Button
                        basic
                        color='grey'
                        content='Cancel'
                        loading={submitting}
                        onClick={() => setSelectedActivity(null)}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

export default ActivityDetails;
