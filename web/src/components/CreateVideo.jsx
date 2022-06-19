import React from 'react';
import { FormControl } from "baseui/form-control";
import { ListHeading } from "baseui/list";
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

import { Input } from "baseui/input";
import { Button } from "baseui/button"
import { Textarea } from "baseui/textarea";;
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Notification } from "baseui/notification"
import { Select } from "baseui/select";

const commonSchema = {
    to: Yup.array().required('Recepient is required'),
    subject: Yup.string().required('Title is required'),
};
const itemProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const Component = ({
    subject: initialSubject,
    message: initialMessage,
    attachment: initialAttachment,
    onSubmit,
    isLoading,
    contacts
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
    });

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
            <FormControl label="Title" error={errors.subject}>
                <Input
                    disabled={isLoading}
                    id="subject"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                />
            </FormControl>
            <FlexGrid
                flexGridColumnCount={2}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                <FlexGridItem {...itemProps}>
                    <Card
                        overrides={{ Root: { style: { padding: "10px",height:'100%' } } }}
                        headerImage={
                            'data:image/png;base64,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'
                        }
                    >
                        <StyledAction>
                            <Button overrides={{ BaseButton: { style: { width: '100%' } } }} onClick={() => { window.open("https://meet.google.com", "_blank").focus() }}>
                                Create Meeting
                            </Button>
                        </StyledAction>
                    </Card>
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <Card
                        overrides={{ Root: { style: { padding: "10px", height:'100%' } } }}
                        headerImage={
                            'data:image/png;base64,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'
                        }
                    >
                        <StyledAction>
                            <Button overrides={{ BaseButton: { style: { width: '100%' } } }} onClick={() => { window.open("https://zoom.us", "_blank").focus() }}>
                                Create Meeting
                            </Button>
                        </StyledAction>
                    </Card>
                </FlexGridItem>

            </FlexGrid>


            <FormControl label="Meeting URL Link" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="attachment"
                    type="url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.attachment}
                />
            </FormControl>
            <FormControl label="Description" error={errors.message}>
                <Textarea
                    error={errors.message}
                    id="message"
                    disabled={isLoading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
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
                Save
            </Button>
        </>
    );
};
export default Component;
