import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { departments } from "../config/constants";

const commonSchema = {
    quantity: Yup.number().required('Number of Interns is required'),
    department: Yup.array().required('Department type is required'),
};

const Component = ({
    department: initialDepartment,
    quantity: initialQuantity,
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
        setFieldValue
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            department: initialDepartment || "",
            quantity: initialQuantity || "",
        },
        onSubmit: (payload) => {
            if (payload.department && payload.quantity) {
                if (onSubmit) {
                    const department = payload.department[0].id
                    onSubmit({ ...payload, department });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Department" error={errors.department}>
                <Select
                    disabled={isLoading}
                    id="department"
                    options={departments}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("department", value);
                    }}
                    value={values.department}
                />
            </FormControl>
            <FormControl label="Number of Interns" error={errors.quantity}>
                <Input
                    disabled={isLoading}
                    id="quantity"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
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
                Request Interns
            </Button>
        </>
    );
};
export default Component;
