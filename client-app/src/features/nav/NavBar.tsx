import { Button, Container, Menu } from 'semantic-ui-react'
import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
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
            </Container>
        </Menu>
    )
};

export default NavBar;
