import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({location}) => {
    return (
        <Fragment>
            <ToastContainer position='bottom-right'/>
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
                            <Switch>
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
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
};

export default withRouter(App);
