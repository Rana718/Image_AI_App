import React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ThemedViewProps extends ViewProps {
    children: React.ReactNode;
    backgroundColorKey?: keyof typeof Colors['light'];
}

const ThemedView: React.FC<ThemedViewProps> = ({ children, backgroundColorKey = 'background', style, ...props }) => {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <View style={[{ backgroundColor: themeColors[backgroundColorKey] }, style]} {...props}>
            {children}
        </View>
    );
};

export default ThemedView;
