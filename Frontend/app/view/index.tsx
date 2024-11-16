import { View, useColorScheme, Image, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function ViewPage() {
    const params = useLocalSearchParams();
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
        if(res.ok){
            setLoading(false);
            setSaved(true);
            ToastAndroid.show("Image Saved Successfully", ToastAndroid.LONG);
        }else{
            console.log("error");
            ToastAndroid.show("Image have expired", ToastAndroid.LONG);
            setLoading(false);
        }
    }
    const ReGenrate = async()=>{
        router.back();
        await fetch(`${API_KEY}/ai/cancel?email=${params.email}`,{
            method: 'DELETE',
        });    
    }

    const downloadImage = async() =>{
        try{
            if(!permission?.granted){
                const permissionResp = await requestPermission();
                if(!permissionResp.granted){
                    ToastAndroid.show("Permission Denied", ToastAndroid.LONG);
                    return;
                }
            }

            if (!FileSystem.documentDirectory) {
                ToastAndroid.show("Storage not available", ToastAndroid.LONG);
                return;
            }

            const fileuri = FileSystem.documentDirectory+Date.now()+"_image.png";
            const {uri} = await FileSystem.downloadAsync(params.image as string, fileuri);

            const asset = await MediaLibrary.createAssetAsync(uri);
            if(asset){
                ToastAndroid.show("Image Saved Successfully", ToastAndroid.LONG);
            }else{
                ToastAndroid.show("Image not Saved", ToastAndroid.LONG);
            }
        }catch(err){
            console.log(err);
            ToastAndroid.show("Error Occured", ToastAndroid.LONG);
        }
    }
    

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
                                onPress={() => ReGenrate()}
                                color="#FF5733"
                            />
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text='Save'
                                onPress={() => handleSave()}
                                color="#FFC300"
                                isLoading={isLoading}
                                loadingColor='#ecedee'
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View className='flex-row justify-between w-full'>
                            <CustomButton
                                className='rounded-xl py-3 px-5 w-[45%]'
                                text="Download"
                                onPress={() => downloadImage()}
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
