import { View, Text, useColorScheme, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import CustomButton from '@/components/ui/CustomButton';

export default function ViewPage() {
    const params = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const [issaved, setSaved] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Your Generated Image",
            headerStyle: {
                backgroundColor: themeColors.background,
            },
            headerTintColor: themeColors.text,
        });
        console.log(params);
    }, [themeColors]);

    return (
        <ThemedView className='flex-1 items-center px-5 pt-8' backgroundColorKey='primary'>
            <View className='w-full h-[380px]'>
                <Image
                    className='w-full h-[380px] rounded-xl'
                    source={{ uri: params.image as string }}
                    resizeMode='cover'
                />
            </View>

            <View className='flex-1 mt-5'>
                {!issaved ? (
                    <>
                        <View className=''>
                            <ThemedText colorKey='text' className='mb-2 font-bold text-xl'>Note: </ThemedText>
                            <ThemedText colorKey='lightText' className='text-sm font-light'>
                                The generated image is available for 10 minutes. Press Save to store it and deduct 5 coins.
                                If you press Regenerate without saving, the image will be lost and cannot be viewed again.
                                Save the image before regenerating to keep it.
                            </ThemedText>
                        </View>

                        <View className='flex-row justify-between w-full mt-5'>
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text='Regenerate'
                                onPress={router.back}
                                color="#FF5733"
                            />
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text='Save'
                                onPress={() => setSaved(true)}
                                color="#FFC300"
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View className='flex-row justify-between w-full'>
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text="Download"
                                onPress={() => console.log("Download")}
                                color="#4CAF50"
                            />
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text="Share"
                                onPress={() => console.log("Share")}
                                color="#2196F3"
                            />
                        </View>
                    </>
                )}
            </View>
        </ThemedView>
    );
}
