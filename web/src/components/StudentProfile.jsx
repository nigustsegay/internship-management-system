import * as React from 'react';
import { OptionProfile } from 'baseui/menu';

export default function Example({ id, name, profilePicture, department }) {
    return (
        <OptionProfile
            overrides={{ ListItemProfile: { style: () => ({ ":hover": { backgroundColor: "transparent" } }) } }}
            item={{ name, profilePicture, department, id }}
            disabled
            getProfileItemLabels={({ name, department, id }) => ({
                title: name,
                subtitle: id,
                body: department
            })}

            getProfileItemImg={item => item.profilePicture || "https://via.placeholder.com/60x60"}
            getProfileItemImgText={item => item.name}

        />
    );
}