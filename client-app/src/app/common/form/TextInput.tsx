import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({
    input,
    meta: {error, touched},
    placeholder,
    type,
    width
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder}/>
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default TextInput;
