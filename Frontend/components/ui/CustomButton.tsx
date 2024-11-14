import { View, Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps = TouchableOpacityProps & {
    text: string;
    color?: string;
    textProps?: object;
}

export default function CustomButton({ text, color = '#6C63FF', textProps = {}, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={{ backgroundColor: color }}
            {...props}
        >
            <Text {...textProps} className='text-white text-xl font-bold text-center'>{text}</Text>
        </TouchableOpacity>
    )
}