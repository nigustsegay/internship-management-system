import React from 'react';
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    advisor: Yup.array().required('Advisor is required'),
};

const Component = ({
    advisor: initialAdvisor,
    onSubmit,
    onReject,
    isLoading,
    advisors
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            advisor: initialAdvisor || "",
        },
        onSubmit: (payload) => {
            if (payload.advisor) {
                if (onSubmit) {
                    const advisor = payload.advisor[0].id
                    onSubmit({ ...payload, advisor });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Advisor" error={!advisors.length ? "No Advisors are currently avaliable" : errors.advisor}>
                <Select
                    disabled={isLoading}
                    id="advisor"
                    options={advisors}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("advisor", value);
                    }}
                    value={values.advisor}
                />
            </FormControl>
            <Button
                type="button"
                id="save"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => ({
                            marginLeft: $theme.sizing.scale200,
                            marginRight: $theme.sizing.scale200,

                        }),
                    },
                }}
            >
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

                        }),
                    },
                }}
            >
                Reject
            </Button>}
        </>
    );
};
export default Component;
