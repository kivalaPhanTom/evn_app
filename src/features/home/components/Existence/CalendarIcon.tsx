import { Colors } from '@/core/constants/colors';
import Svg, { Path } from 'react-native-svg';

const CalendarIcon = ({
    size = 20,
    color =  Colors.grey,
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
    >
        <Path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </Svg>
);

export default CalendarIcon;
