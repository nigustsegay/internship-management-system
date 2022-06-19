import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
};
componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    } Assign
            </Button>
            {onReject && <Button
                type="button"
                id="save"
                onClick={() => {
                    onReject();
                }}
                isLoading={isLoading}
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => ({
                            marginLeft: $theme.sizing.scale200,
                            marginRight: $theme.sizing.scale200,


    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        }
        // Normally, just render children
        return this.props.children;
    }
}
const Component = ({
    email: initialEmail,
    password: initialPassword,
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
            email: initialEmail || "",
            password: initialPassword || "",
        },
        onSubmit: (payload) => {
            if (payload.email && payload.password) {
                if (onSubmit) {
                    onSubmit(payload);
                }
            }
        },
    });

    return (
        <>
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
            <Button
                type="button"
                id="save"
                overrides={{ BaseButton: { style: () => ({ width: "100%" }) } }}
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    } Assign
            </Button>
            {onReject && <Button
                type="button"
                id="save"
                onClick={() => {
                    onReject();
                }}
                isLoading={isLoading}
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => ({
                            marginLeft: $theme.sizing.scale200,
                            marginRight: $theme.sizing.scale200,


    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        }
        // Normally, just render children
        return this.props.children;
    }
}
                Login
            </Button>
        </>
    );
};
export default Component;
