import React, { useContext, Fragment } from 'react';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;
    const {openModal} = rootStore.modalStore;

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
                {isLoggedIn && user
                    ? (
                        <Fragment>
                            <Header
                                as='h2'
                                content={`Welcome back, ${user?.displayName}!`}
                                inverted
                            />
                            <Button
                                as={Link}
                                inverted
                                size='huge'
                                to='/activities'
                            >
                                Go to activities!
                            </Button>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Button
                                inverted
                                onClick={() => openModal(<LoginForm/>)}
                                size='huge'
                            >
                                Login
                            </Button>
                            <Button
                                inverted
                                onClick={() => openModal(<RegisterForm/>)}
                                size='huge'
                            >
                                Register
                            </Button>
                        </Fragment>
                    )
                }
            </Container>
        </Segment>
    );
};

export default HomePage;
