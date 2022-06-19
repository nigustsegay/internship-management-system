import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from "../FileUploader";
import { Notification } from 'baseui/notification';

const commonSchema = {
    company: Yup.string().required('Company Name is required'),
    logo: Yup.string().required('Company Logo is required'),
    description: Yup.string().required('Description is required'),
};

const Component = ({
    company: initialCompany,
    description: initialDescription,
    logo: initialLogo,
    onSubmit,
    isLoading,
}) => {
    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            description: initialDescription || "",
            company: initialCompany || "",
            logo: initialLogo || "",
        },
        onSubmit: (payload) => {
            if (payload.company && payload.description && payload.logo) {

                if (onSubmit) {
                    onSubmit({ description: payload.description, name: payload.company, logo: payload.logo });
                }
            }
        },
    });
    const FileUploaded = (field) => {
        return <Notification
            closeable
            kind="positive"
            onClose={() => { setFieldValue(field, "") }}
            overrides={{
                Body: { style: { width: 'auto' } },
            }}
        >
            <img width="256" height="256" src={values.logo} />
        </Notification>
    }
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
            <FormControl label="Company Logo" error={errors.logo}>
                {values.logo ? FileUploaded("logo") : <FileUploader accept="image/*" onUpload={(url) => { setFieldValue("logo", url) }} />}
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
