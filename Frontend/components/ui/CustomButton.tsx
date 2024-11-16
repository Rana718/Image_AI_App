import { View, Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import React from 'react'
import Loading from './Loading';

type ButtonProps = TouchableOpacityProps & {
    text: string;
    color?: string;
    textProps?: object;
    isLoading?: boolean;
    loadingColor?: string;
}

export default function CustomButton({ text, color = '#6C63FF', loadingColor, isLoading, textProps = {}, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={{ backgroundColor: color }}
            {...props}
        >
            {isLoading ? (
                <Loading color={loadingColor} />
            ) : (

                <Text {...textProps} className='text-white text-xl font-bold text-center'>{text}</Text>
            )}
        </TouchableOpacity>
    )
}