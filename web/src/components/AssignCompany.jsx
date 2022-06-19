import React from 'react';
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    company: Yup.array().required('Company is required'),
};

const Component = ({
    company: initialCompany,
    onSubmit,
    isLoading,
    companies
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            company: initialCompany || "",
        },
        onSubmit: (payload) => {
            if (payload.company) {
                if (onSubmit) {
                    const company = payload.company[0].id
                    onSubmit({ ...payload, company });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Company" error={!companies.length ? "No Companies are currently avaliable" : errors.company}>
                <Select
                    disabled={isLoading}
                    id="company"
                    options={companies}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("company", value);
                    }}
                    value={values.company}
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
                Assign
            </Button>
        </>
    );
};
export default Component;
