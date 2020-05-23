import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {
    return (
        <Fragment>
            <Route
                component={HomePage}
                exact
                path='/'
            />
            <Route
                path={`/(.+)`}
                render={() => (
                    <Fragment>
                        <NavBar/>
                        <Container style={{marginTop: '7em'}}>
                            <Route
                                component={ActivityDashboard}
                                exact
                                path='/activities'
                            />
                            <Route
                                component={ActivityDetails}
                                path='/activities/:id'
                            />
                            <Route
                                component={ActivityForm}
                                key={location.key}
                                path={['/createActivity', '/manage/:id']}
                            />
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
};

export default withRouter(App);
