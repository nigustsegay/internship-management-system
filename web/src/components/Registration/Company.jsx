import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    company: Yup.string().required('Company Name is required'),
    description: Yup.string().required('Description is required'),
};

const Component = ({
    company: initialCompany,
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
            description: initialDescription || "",
            company: initialCompany || "",
        },
        onSubmit: (payload) => {
            if (payload.company && payload.description) {
                // TODO add logo selector 
                if (onSubmit) {
                    onSubmit({ description: payload.description, name: payload.company, logo: "logo" });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Company Name" error={errors.company}>
                <Input
                    disabled={isLoading}
                    id="company"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.company}
                />
            </FormControl>
            <FormControl label="Company Description" error={errors.description}>
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
                kind="secondary"
                shape="pill"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Continue
            </Button>
        </>
    );
};
export default Component;
