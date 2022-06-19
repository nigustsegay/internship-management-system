import React from 'react';
import { FormControl } from "baseui/form-control";
import { ListHeading } from "baseui/list";
import { Button, SIZE } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from "./FileUploader";
import { Notification } from 'baseui/notification';

const commonSchema = {
    documentOfIntent: Yup.string().required('Document of Intent is required'),
};
 Assign
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

const Component = ({
    documentOfIntent: initialDocumentOfIntent,
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
            documentOfIntent: initialDocumentOfIntent || "",
        },
        onSubmit: (payload) => {
            if (payload.documentOfIntent) {
                if (onSubmit) {
                    onSubmit({ ...payload });
                }
            }
        },
    });
 Assign
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
            <FormControl label="Document Of Intent" error={errors.documentOfIntent}>
                {values.documentOfIntent ? FileUploaded("documentOfIntent", "Document of Intent") : <FileUploader onUpload={(url) => { setFieldValue("documentOfIntent", url) }} />}
            </FormControl>
            <Button
                type="button"
                id="save"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Apply for Internship
            </Button>
        </>
    );
};
export default Component;
