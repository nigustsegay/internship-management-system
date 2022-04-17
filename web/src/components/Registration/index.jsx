import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import Student from "./Student";
import Company from "./Company";
import Advisor from "./Advisor";
import SpacedButton from "../SpacedButton";

import AccountInfo from "./AccountInfo";
function ProgressStepsContainer({ isLoading, onSubmit }) {
    const [css, theme] = useStyletron();
    const [current, setCurrent] = useState(0);
    const [accountInfo, setAccountInfo] = useState(null);
    const AdditionalInfo = (role) => {
        const submit = (payload) => {
            setAccountInfo({ ...accountInfo, ...payload }); setCurrent(2);
        }
        switch (role) {
            case "ADVISOR":
                return <Advisor onSubmit={submit} />
            case "COMPANY":
                return <Company onSubmit={submit} />
            case "STUDENT":
                return <Student onSubmit={submit} />
            default:
                return <p>No Additional information required</p>
        }
    }
    return (
        <ProgressSteps current={current} overrides={{ Root: { style: () => ({ width: "100%" }) } }}>
            <NumberedStep title="Account Information">
                <div
                    className={css({
                        ...theme.typography.ParagraphSmall,
                        marginBottom: '24px',
                    })}
                >
                    Enter Account Information
                </div>

                <AccountInfo onSubmit={(payload) => { setAccountInfo(payload); setCurrent(1); }} />
            </NumberedStep>

            <NumberedStep title="Additional Information">
                <div
                    className={css({
                        ...theme.typography.ParagraphSmall,
                        marginBottom: '24px',
                    })}
                >
                    Please provide this additional information
                </div>
                {accountInfo && accountInfo.role && AdditionalInfo(accountInfo.role)}
            </NumberedStep>
            <NumberedStep title="Finish Signup">
                <div
                    className={css({
                        ...theme.typography.ParagraphSmall,
                        marginBottom: '24px',
                    })}
                >
                    Complete your registration
                </div>
                <SpacedButton isLoading={isLoading} onClick={() => { onSubmit(accountInfo) }}>Signup</SpacedButton>

            </NumberedStep>

        </ProgressSteps>
    );
}
export default ProgressStepsContainer;