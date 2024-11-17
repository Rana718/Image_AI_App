import React from 'react';
import { Text, TextProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface ThemedTextProps extends TextProps {
    children: React.ReactNode;
    colorKey?: keyof typeof Colors['light']; 
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, children, colorKey = 'text', ...props }) => {
    const { themeColors } = useTheme();

    return (
        <Text style={[{ color: themeColors[colorKey] }, style]} {...props}>
            {children}
        </Text>
    );
};

export default ThemedText;
