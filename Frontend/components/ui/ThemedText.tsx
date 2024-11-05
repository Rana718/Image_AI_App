import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ThemedTextProps extends TextProps {
    children: React.ReactNode;
    colorKey?: keyof typeof Colors['light']; 
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, children, colorKey = 'text', ...props }) => {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <Text style={[{ color: themeColors[colorKey] }, style]} {...props}>
            {children}
        </Text>
    );
};

export default ThemedText;
