import { View, useColorScheme, TouchableOpacity, Text, Image, ToastAndroid, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ui/ThemedView';
import CustomButton from '@/components/ui/CustomButton';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import ThemedText from '@/components/ui/ThemedText';

export default function ViewPage() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const [issaved, setSaved] = useState(false);
    const API_KEY = process.env.EXPO_PUBLIC_BACKEND_API;
    const [isLoading, setLoading] = useState(false);
    const [permission, requestPermission] = MediaLibrary.usePermissions();

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

    const handleSave = async () => {
        setLoading(true);
        const res = await fetch(`${API_KEY}/ai/save?email=${params.email}`)
        if (res.ok) {
            setLoading(false);
            setSaved(true);
            ToastAndroid.show("Image Saved Successfully", ToastAndroid.LONG);
        } else {
            console.log("error");
            ToastAndroid.show("Image have expired", ToastAndroid.LONG);
            setLoading(false);
        }
    }
    const ReGenrate = async () => {
        router.back();
        await fetch(`${API_KEY}/ai/cancel?email=${params.email}`, {
            method: 'DELETE',
        });
    }
    const Delete = async () => {
        router.back();
        const res = await fetch(`${API_KEY}/images?image=${params.image}`, {
            method: 'DELETE',
        });
        console.log(res);
        router.back();
    }

    const downloadImage = async () => {
        try {
            if (!permission?.granted) {
                const permissionResp = await requestPermission();
                if (!permissionResp.granted) {
                    ToastAndroid.show("Permission Denied", ToastAndroid.LONG);
                    return;
                }
            }

            if (!FileSystem.documentDirectory) {
                ToastAndroid.show("Storage not available", ToastAndroid.LONG);
                return;
            }

            const fileuri = FileSystem.documentDirectory + Date.now() + "_image.png";
            const { uri } = await FileSystem.downloadAsync(params.image as string, fileuri);

            const asset = await MediaLibrary.createAssetAsync(uri);
            if (asset) {
                ToastAndroid.show("Image Saved Successfully", ToastAndroid.LONG);
            } else {
                ToastAndroid.show("Image not Saved", ToastAndroid.LONG);
            }
        } catch (err) {
            console.log(err);
            ToastAndroid.show("Error Occured", ToastAndroid.LONG);
        }
    }
    const handleShare = async () => {
        try {
            await Share.share({
                message: `${params.image}`,
            });
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Error Occurred While Sharing", ToastAndroid.LONG);
        }
    };
    


    return (
        <ThemedView className='flex-1 items-center px-5 pt-8' backgroundColorKey='primary'>
            <View className='w-full h-[380px]'>
                <Image
                    className='w-full h-[380px] rounded-xl'
                    source={{ uri: params.image as string }}
                    resizeMode='cover'
                />
            </View>

            <View className='flex-1 mt-5 w-full items-center'>
                {!issaved && params.isHome !== 'true' ? (
                    <>
                        <View className='w-full'>
                            <ThemedText colorKey='text' className='mb-2 font-bold text-xl'>Note: </ThemedText>
                            <ThemedText colorKey='lightText' className='text-sm font-light'>
                                The generated image is available for 10 minutes. Press Save to store it and deduct 5 coins.
                                If you press Regenerate without saving, the image will be lost and cannot be viewed again.
                                Save the image before regenerating to keep it.
                            </ThemedText>
                        </View>

                        <View className='w-full mt-5 flex-col items-center gap-4'>
                            <TouchableOpacity
                                className='rounded-xl py-3 w-3/4 bg-[#FF5733] items-center'
                                onPress={() => ReGenrate()}
                            >
                                <Text className="font-bold text-white text-xl">
                                    Regenerate
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='rounded-xl py-3 w-3/4 bg-[#FFC300] items-center'
                                onPress={() => handleSave()}
                                disabled={isLoading}
                            >
                                <Text className="font-bold text-white text-xl">
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View className='flex-col items-center mt-8 gap-4 w-full'>
                            <TouchableOpacity
                                className='rounded-xl py-3 w-3/4 bg-[#4CAF50] items-center'
                                onPress={() => downloadImage()}
                            >
                                <Text className="font-bold text-white text-xl">
                                    Download
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='rounded-xl py-3 w-3/4 bg-[#FF0000] items-center'
                                onPress={() => Delete()}
                            >
                                <Text className="font-bold text-white text-xl">
                                    Delete
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='rounded-xl py-3 w-3/4 bg-[#2196F3] items-center'
                                onPress={() => handleShare()}
                            >
                                <Text className="font-bold text-white text-xl">
                                    Share
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </ThemedView>
    );
}
