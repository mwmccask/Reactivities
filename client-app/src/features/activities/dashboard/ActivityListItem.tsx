import React from 'react';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';

interface IProps {
    activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Matt
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock'/> {activity.date}
                <Icon name='marker'/> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    color='blue'
                    content='View'
                    floated='right'
                    to={`activities/${activity.id}`}
                />
            </Segment>
        </Segment.Group>
    )
};

export default ActivityListItem;
