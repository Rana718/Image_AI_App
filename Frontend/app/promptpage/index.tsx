import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { ModelInfo } from '@/constants/ModelInfo';
import { Colors } from '@/constants/Colors';
import ThemedText from '@/components/ui/ThemedText';
import TextInputBox from '@/components/TextInput';
import ImageUpload from '@/components/ImageUpload';
import ThemedScrollView from '@/components/ui/ThemedScrollView';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { UserDetailContext } from '@/context/UserDetailContext';

export default function PromptPage() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const [userPrompt, setUserPrompt] = useState('');
    const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
    const colorScheme = useColorScheme();
    const [photoURL, setPhotoURL] = useState('');
    const [isPrompt, setIsPrompt] = useState(false);
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const isEnable = params?.prompt?.length > 0 ? true : false;
    const api_key = params.api
    const API_KEY = process.env.EXPO_PUBLIC_BACKEND_API;
    //@ts-expect-error
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    useEffect(() => {
        const parsedParams = {
            ...params,
            upload: params.upload === 'true',
        };

        //@ts-expect-error
        setModelInfo(parsedParams);

        navigation.setOptions({
            headerTitle: params.name,
            headerStyle: {
                backgroundColor: themeColors.background,

            },
            headerTintColor: themeColors.text,
        });

    }, [themeColors])


    const handleGenerate = async () => {
        if (params.upload === 'true') {
            const prompt = params.prompt?.length > 0 ? params.prompt : userPrompt;
            const isremovebg = params.name === 'Remove Bg' ? 'true' : 'false';
            console.log(api_key)
            try{
                const imageBase64 = await FileSystem.readAsStringAsync(photoURL, {
                    encoding: FileSystem.EncodingType.Base64,
                })
                const res = await axios.post(`${API_KEY}/ai/${api_key}`, {
                    imageBase64: imageBase64 ,
                    isremovebg: isremovebg,
                    email: userDetail.userEmail,
                    prompt: prompt
                },{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    responseType: 'json',
                    
                })
                router.push({
                    pathname: '/view',
                    params:{
                        response: res.data,
                        email: userDetail.userEmail
                    }
                })
                console.log(res.data);
            }catch (error: any) {
                console.error("Error generating image:", error.response?.data || error.message);
                return null;
            }
        } else {
            try {
                console.log('Sending request with prompt:', userPrompt);
                const res = await axios.post(`${API_KEY}/ai/${api_key}`, {
                    text: userPrompt,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    responseType: 'blob',
                });
                if (res.status === 200 && res.headers["content-type"].startsWith("image/")) {
                    console.log(res.data);
                } else {
                    console.log("Error:", res);
                    
                }
            }catch (error: any) {
                console.error("Error generating image:", error.response?.data || error.message);
                return null;
            }
        }
    }

    return (
        <ThemedScrollView className='flex-1 px-5 pt-5' backgroundColorKey='primary'>
            <ThemedText className='text-3xl font-bold'>{modelInfo?.name}</ThemedText>

            <View className='mb-6'>
                {modelInfo?.upload ? (
                    <ImageUpload
                        setText={setUserPrompt}
                        setPhoto={setPhotoURL}
                        isPrompt={isPrompt}
                        setIsPrompt={setIsPrompt}
                        isEnabled={isEnable}
                    />


                ) : (<TextInputBox setPrompt={setUserPrompt} />)}
            </View>

            <ThemedText className='mt-2 ml-5' colorKey='lightText'>
                <Text className='font-black'>NOTE: </Text>
                <Text className='font-light'>1 Credit will use to genrate Ai Image</Text>
            </ThemedText>

            <View className='items-center mt-7'>
                <TouchableOpacity
                    onPress={() => handleGenerate()}
                    className='w-[80%] bg-tint py-2 rounded-lg mt-5'
                >
                    <Text className='text-white font-bold text-3xl text-center'>Generate</Text>
                </TouchableOpacity>
            </View>

        </ThemedScrollView>
    )
}