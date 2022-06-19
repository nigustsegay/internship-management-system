import React from 'react';
import { FormControl } from "baseui/form-control";
import { ListHeading } from "baseui/list";
import { Input } from "baseui/input";
import { Button } from "baseui/button"
import { Textarea } from "baseui/textarea";;
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from "./FileUploader";
import { Notification } from "baseui/notification"
import { Select } from "baseui/select";

const commonSchema = {
    to: Yup.array().required('Recepient is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message Body is required'),
};

const Component = ({
    subject: initialSubject,
    message: initialMessage,
    attachment: initialAttachment,
    onSubmit,
    isLoading,
    contacts
}) => {
    const { Assign
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
            subject: initialSubject || "",
            message: initialMessage || "",
            attachment: initialAttachment || "",
        },
        onSubmit: (payload) => {
            if (payload.subject && payload.message && payload.to) {
                if (onSubmit) {
                    const toEmail = payload.to[0].id
                    onSubmit({ ...payload, toEmail });
                }
            }
        },
    }); Assign
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
            <FormControl label="Recepient" error={contacts && contacts.length ? errors.to : "You don't have any contacts"}>
                <Select
                    disabled={isLoading}
                    id="to"
                    options={contacts}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("to", value);
                    }}
                    value={values.to}
                />
            </FormControl>
            <FormControl label="Subject" error={errors.subject}>
                <Input
                    disabled={isLoading}
                    id="subject"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                />
            </FormControl>
            <FormControl label="Message" error={errors.message}>
                <Textarea
                    error={errors.message}
                    id="message"
                    disabled={isLoading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                />
            </FormControl>
            <FormControl label="Attachement" error={errors.attachment}>
                {values.attachment ? FileUploaded("attachment", "Attachement") : <FileUploader onUpload={(url) => { setFieldValue("attachment", url) }} />}
            </FormControl>
            <Button
                type="button"
                id="save"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Send
            </Button>
        </>
    );
};
export default Component;
