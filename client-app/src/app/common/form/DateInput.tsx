import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

interface IProps extends FieldRenderProps<Date>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
    date = false,
    id = null,
    input,
    meta: {error, touched},
    placeholder,
    time = false,
    width,
    ...rest
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                date={date}
                onBlur={input.onBlur}
                onChange={input.onChange}
                onKeyDown={(event) => event.preventDefault()}
                placeholder={placeholder}
                time={time}
                value={input.value || null}
                {...rest}
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default DateInput;
