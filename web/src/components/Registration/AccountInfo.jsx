import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    fullname: Yup.string().required('Fullname is required'),
    role: Yup.array().required('Account type is required'),
};

const Component = ({
    email: initialEmail,
    password: initialPassword,
    fullname: initialFullname,
    role: initialRole,
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
            fullname: initialFullname || "",
            email: initialEmail || "",
            password: initialPassword || "",
            role: initialRole || "",
        },
        onSubmit: (payload) => {
            if (payload.email && payload.password && payload.fullname && payload.role) {
                if (onSubmit) {
                    const r = payload.role[0].id
                    onSubmit({ ...payload, role: r });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Full Name" error={errors.fullname}>
                <Input
                    disabled={isLoading}
                    id="fullname"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullname}
                />
            </FormControl>
            <FormControl label="Email" error={errors.email}>
                <Input
                    disabled={isLoading}
                    id="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
            </FormControl>
            <FormControl label="Password" error={errors.password}>
                <Input
                    disabled={isLoading}
                    id="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
            </FormControl>
            <FormControl label="Account type" error={errors.role}>
                <Select
                    disabled={isLoading}
                    id="role"
                    options={[
                        { label: "Student", id: "STUDENT" },
                        { label: "University Advisor", id: "ADVISOR" },
                        { label: "Company Advisor", id: "COMPANY" },
                    ]}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("role", value);
                    }}
                    value={values.role}
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
