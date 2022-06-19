import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { departments } from "../../config/constants";

const commonSchema = {
    employeeId: Yup.string().required('Employee ID is required'),
    department: Yup.array().required('Department type is required'),
};

const Component = ({
    department: initialDepartment,
    employeeId: initialEmployeeId,
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
            employeeId: initialEmployeeId || "",
        },
        onSubmit: (payload) => {
            if (payload.department && payload.employeeId) {
                if (onSubmit) {
                    const department = payload.department[0].id
                    onSubmit({ ...payload, department });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Employee ID" error={errors.employeeId}>
                <Input
                    disabled={isLoading}
                    id="employeeId"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employeeId}
                />
            </FormControl>
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
