import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
};

const Component = ({
    name: initialName,
    description: initialDescription,
    onSubmit,
    isLoading,
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            name: initialName || "",
            description: initialDescription || "",
        },
        onSubmit: (payload) => {
            if (payload.name && payload.description) {
                if (onSubmit) {
                    onSubmit(payload);
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Name" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="name"
                    type="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
            </FormControl>
            <FormControl label="Description" error={errors.description}>
                <Textarea
                    error={errors.description}
                    id="description"
                    disabled={isLoading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
            </FormControl>
            <Button
                type="button"
                id="save"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Add Task
            </Button>
        </>
    );
};
export default Component;
