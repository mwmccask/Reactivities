import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
    input,
    meta: {error, touched},
    placeholder,
    rows,
    width
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <textarea {...input} placeholder={placeholder} rows={rows}/>
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default TextAreaInput;
