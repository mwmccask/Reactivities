import { Button, Container, Menu } from 'semantic-ui-react'
import React from 'react'

interface IProps {
    openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item name="header">
                    <img
                        alt="logo"
                        src="/assets/logo.png"
                        style={{marginRight: '10px'}}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button
                        content='Create Activity'
                        onClick={() => openCreateForm()}
                        positive
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default NavBar;
