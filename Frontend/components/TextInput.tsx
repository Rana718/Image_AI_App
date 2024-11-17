import { View, TextInput } from 'react-native'
import React from 'react'
import ThemedText from './ui/ThemedText'
import { useTheme } from '@/context/ThemeContext';

interface TextInputBoxProps {
    setPrompt: (prompt: string) => void;
}

export default function TextInputBox({setPrompt}: TextInputBoxProps) {
    const { themeColors } = useTheme();

    return (
        <View>
            <ThemedText className='text-xl font-light mt-3' colorKey='lightText'>
                Enter Your Prompt
            </ThemedText>

            <TextInput 
                placeholder='Enter Your Prompt...'
                numberOfLines={8}
                multiline={true}
                onChange={(e)=> setPrompt(e.nativeEvent.text)}
                textAlignVertical='top'
                className='p-4 rounded-2xl mt-4 border text-lg mx-2'
                style={{
                    backgroundColor: themeColors.lightbackground,
                    borderColor: themeColors.text,
                    color: themeColors.text,
                }}
            />
        </View>
    )
}