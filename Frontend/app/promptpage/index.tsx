import { View, Text, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { ModelInfo } from '@/constants/ModelInfo';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import TextInputBox from '@/components/TextInput';
import ImageUpload from '@/components/ImageUpload';

export default function PromptPage() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        const parsedParams = {
            ...params,
            upload: params.upload === 'true',
        };

        //@ts-expect-error
        setModelInfo(parsedParams);
        console.log(parsedParams);

        navigation.setOptions({
            headerTitle: params.name,
            headerStyle: {
                backgroundColor: themeColors.background,

            },
            headerTintColor: themeColors.text,
        });


    }, [])

    return (
        <ThemedView className='flex-1 px-5 pt-5' backgroundColorKey='primary'>
            <ThemedText className='text-3xl font-bold'>{modelInfo?.name}</ThemedText>

            <View>
                {modelInfo?.upload ? <ImageUpload /> : <TextInputBox />}
            </View>

        </ThemedView>
    )
}