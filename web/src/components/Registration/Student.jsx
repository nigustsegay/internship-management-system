import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { departments } from "../../config/constants";

const commonSchema = {
    studentId: Yup.string().required('Student ID is required'),
    department: Yup.array().required('Department type is required'),
};

const Component = ({
    department: initialDepartment,
    studentId: initialStudentId,
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
            studentId: initialStudentId || "",
        },
        onSubmit: (payload) => {
            if (payload.department && payload.studentId) {
                if (onSubmit) {
                    const department = payload.department[0].id
                    onSubmit({ ...payload, department });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Student ID" error={errors.studentId}>
                <Input
                    disabled={isLoading}
                    id="studentId"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentId}
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
