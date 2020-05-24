import React from 'react';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const activityImageStyle = { filter: 'brightness(30%)' };

const activityImageTextStyle = {
    bottom: '5%',
    color: 'white',
    height: 'auto',
    left: '5%',
    position: 'absolute',
    width: '100%'
};

const ActivityDetailedHeader: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment
                 attached='top'
                 basic
                 style={{ padding: '0' }}
            >
                <Image
                    fluid
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    style={activityImageStyle}
                />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    content={activity.title}
                                    size='huge'
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date, 'eeee do MMMM')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment
                attached='bottom'
                clearing
            >
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button
                    as={Link}
                    color='orange'
                    floated='right'
                    to={`/manage/${activity.id}`}
                >
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
};

export default observer(ActivityDetailedHeader);
