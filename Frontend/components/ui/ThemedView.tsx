import React from 'react';
import { View, ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface ThemedViewProps extends ViewProps {
    children: React.ReactNode;
    backgroundColorKey?: keyof typeof Colors['light'];
}

const ThemedView: React.FC<ThemedViewProps> = ({ children, backgroundColorKey = 'background', style, ...props }) => {
    const { themeColors } = useTheme();

    return (
        <View style={[{ backgroundColor: themeColors[backgroundColorKey] }, style]} {...props}>
            {children}
        </View>
    );
};

export default ThemedView;
