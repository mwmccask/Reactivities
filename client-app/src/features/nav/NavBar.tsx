import { Button, Container, Menu } from 'semantic-ui-react'
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../app/stores/activityStore';

const NavBar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {openCreateForm} = activityStore;

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
                        onClick={openCreateForm}
                        positive
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default observer(NavBar);
