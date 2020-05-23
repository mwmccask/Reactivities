import React from 'react';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image
                        alt='logo'
                        size='massive'
                        src='/assets/logo.png'
                        style={{ marginBottom: 12 }}
                    />
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities'/>
                <Button
                    as={Link}
                    inverted
                    size='huge'
                    to='/activities'
                >
                    Take me to the activities!
                </Button>
            </Container>
        </Segment>
    )
};

export default HomePage;
