import React, { useContext } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    displayName: isRequired('displayName'),
    email: isRequired('email'),
    password: isRequired('password'),
    username: isRequired('username')
});

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({
                dirtyFieldsSinceLastSubmit,
                handleSubmit,
                invalid,
                pristine,
                submitError,
                submitting
            }) => (
                <Form error onSubmit={handleSubmit}>
                    <Header
                        as='h2'
                        color='teal'
                        content='Sign up for Reactivities'
                        textAlign='center'
                    />
                    <Field
                        component={TextInput}
                        name='username'
                        placeholder='Username'
                    />
                    <Field
                        component={TextInput}
                        name='displayName'
                        placeholder='Display Name'
                    />
                    <Field
                        component={TextInput}
                        name='email'
                        placeholder='Email'
                    />
                    <Field
                        component={TextInput}
                        name='password'
                        placeholder='Password'
                        type='password'
                    />
                    {submitError &&  (
                        <ErrorMessage
                            error={submitError}
                            text='Invalid credentials'
                        />
                    )}
                    <Button
                        color='teal'
                        content='Register'
                        disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}
                        fluid
                        loading={submitting}
                    />
                </Form>
            )}
        />
    );
};

export default RegisterForm;
