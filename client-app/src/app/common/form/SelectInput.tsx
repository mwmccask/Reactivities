import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label, Select } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
    input,
    meta: {error, touched},
    options,
    placeholder,
    width
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select
                onChange={(event, data) => input.onChange(data.value)}
                options={options}
                placeholder={placeholder}
                value={input.value}
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default SelectInput;
