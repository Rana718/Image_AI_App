import { View, Text, useColorScheme, TextInput } from 'react-native'
import React from 'react'
import ThemedText from './ui/ThemedText'
import { Colors } from '@/constants/Colors';

export default function TextInputBox() {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
        <View>
            <ThemedText className='text-sm mt-3 ml-1' colorKey='lightText'>
                Enter Your Prompt
            </ThemedText>

            <TextInput 
                placeholder='Enter Your Prompt...'
                numberOfLines={5}
                multiline={true}
                textAlignVertical='top'
                className='p-4 rounded-2xl mt-4 border'
                style={{
                    backgroundColor: themeColors.lightbackground,
                    borderColor: themeColors.text,
                    color: themeColors.text,
                }}
            />
        </View>
    )
}