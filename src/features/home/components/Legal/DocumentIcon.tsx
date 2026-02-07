import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
    size?: number;
    color?: string;
}

const DocumentIcon: React.FC<Props> = ({
    size = 16,
    color = 'currentColor',
}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
        >
            <Path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default DocumentIcon;
