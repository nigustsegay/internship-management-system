import React from 'react';
import { FormControl } from "baseui/form-control";
import { ListHeading } from "baseui/list";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from "./FileUploader";
import { Notification } from "baseui/notification"

const commonSchema = {
    name: Yup.string().required('Report name is required'),
    document: Yup.string().required('Report document is required'),
};

const Component = ({
    document: initialDocument,
    name: initialName,
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
            document: initialDocument || "",
            name: initialName || "",
        },
        onSubmit: (payload) => {
            if (payload.document && payload.name) {
                if (onSubmit) {
                    onSubmit({ ...payload });
                }
            }
        },
    });

    const FileUploaded = (field, subHeading) => {
        return <Notification
            closeable
            kind="positive"
            onClose={() => { setFieldValue(field, "") }}
            overrides={{
                Body: { style: { width: 'auto' } },
            }}
        >
            File uploaded : {subHeading}
        </Notification>
    }
    return (
        <>
            <FormControl label="Document Name" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
            </FormControl>
            <FormControl label="Document Document" error={errors.document}>
                {values.document ? FileUploaded("document", "Document Document") : <FileUploader onUpload={(url) => { setFieldValue("document", url) }} />}
            </FormControl>
            <Button
                type="button"
                id="save"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Submit Document
            </Button>
        </>
    );
};
export default Component;
