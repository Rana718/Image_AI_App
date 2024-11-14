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
import Loading from '@/components/ui/Loading';

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
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true)
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
                setIsLoading(false)
                router.push({
                    pathname: '/view',
                    params:{
                        image: res.data,
                        email: userDetail.userEmail
                    }
                })
            }catch (error: any) {
                setIsLoading(false)
                console.error("Error generating image:", error.response?.data || error.message);
                return null;
            }
        } else {
            setIsLoading(true)
            try {
                console.log('Sending request with prompt:', userPrompt);
                const res = await axios.post(`${API_KEY}/ai/${api_key}`, {
                    text: userPrompt,
                    email: userDetail.userEmail
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    responseType: 'json',
                });
                if (res.status === 200 ) {
                    setIsLoading(false)
                    router.push({
                        pathname: '/view',
                        params:{
                            image: res.data,
                            email: userDetail.userEmail
                        }
                    })
                } else {
                    setIsLoading(false)
                    console.log("Error:", res);
                    
                }
            }catch (error: any) {
                setIsLoading(false)
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
                    {isLoading ?(
                        <Loading size={"large"}/>
                    ):(
                        <Text className='text-white font-bold text-3xl text-center'>Generate</Text>
                    )}
                </TouchableOpacity>
            </View>

        </ThemedScrollView>
    )
}