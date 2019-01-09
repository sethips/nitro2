/**@jsx jsx */
import React from "react";
import { jsx, css } from "emotion";

const logo = css`
    color: white;
    font-size: 1.8em;
    font-weight: bold;
    padding: 25px 0;
    text-align: center;
    height: 35px;
`;

const Logo = () => {
    return (
        <div css={logo}>
            <img src="data:image/png;base64,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" alt="" />
        </div>
    );
};

export default Logo;
