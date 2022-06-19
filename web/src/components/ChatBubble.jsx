import React from "react";
import { Card, StyledBody, StyledAction } from 'baseui/card';

const Component = ({ message, date, me }) => {
    return <Card key={message} overrides={{ Root: { style: ({ $theme }) => ({ backgroundColor: me ? $theme.colors.primary50 : "white", [me ? "marginLeft" : "marginRight"]: '10%', marginBottom: "10px" }) } }}>
        <StyledBody>
            <p style={{ fontWeight: "bold"}}>{message}</p>
        </StyledBody>
        <StyledAction>
            <p style={{ color: "gray" }}>{date}</p>
        </StyledAction>
    </Card>

}

export default Component;