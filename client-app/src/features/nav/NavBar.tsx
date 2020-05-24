import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar = () => {
    const rootStore = useContext(RootStoreContext);
    const {logout, user} = rootStore.userStore;

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item
                    as={NavLink}
                    exact
                    header
                    to='/'
                >
                    <img
                        alt="logo"
                        src="/assets/logo.png"
                        style={{marginRight: '10px'}}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    name='Activities'
                    to='/activities'
                />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        content='Create Activity'
                        positive
                        to='/createActivity'
                    />
                </Menu.Item>
                {user &&
                    <Menu.Item position='right'>
                        <Image
                            avatar
                            spaced='right'
                            src={user.image || '/assets/user.png'}
                        />
                        <Dropdown
                            pointing='top left'
                            text={user.displayName}
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as={Link}
                                    icon='user'
                                    text='My profile'
                                    to={`/profile/username`}
                                />
                                <Dropdown.Item
                                    icon='power'
                                    onClick={logout}
                                    text='Logout'
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                }
            </Container>
        </Menu>
    );
};

export default NavBar;
