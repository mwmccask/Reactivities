import React, { Fragment } from 'react';
import { Image, Item, Label, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ActivityDetailedSidebar = () => {
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
                3 People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Label
                            color='orange'
                            ribbon='right'
                            style={{ position: 'absolute' }}
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Sally</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </Fragment>
    )
};

export default ActivityDetailedSidebar;
