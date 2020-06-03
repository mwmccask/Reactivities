import React, { Fragment } from 'react';
import { Image, Item, Label, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';

interface IProps {
    attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<IProps> = ({attendees}) => {
    return (
        <Fragment>
            <Segment
                attached='top'
                color='teal'
                inverted
                secondary
                style={{ border: 'none' }}
                textAlign='center'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item
                            key={attendee.username}
                            style={{ position: 'relative' }}
                        >
                            {attendee.isHost &&
                                <Label
                                    color='orange'
                                    ribbon='right'
                                    style={{ position: 'absolute' }}
                                >
                                    Host
                                </Label>
                            }
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </Fragment>
    )
};

export default observer(ActivityDetailedSidebar);
