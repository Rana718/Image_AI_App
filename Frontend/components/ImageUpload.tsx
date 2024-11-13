import { View, Text, ToastAndroid, TouchableOpacity, Image, useColorScheme, Switch } from 'react-native';
import React, { useState } from 'react';
import ThemedText from './ui/ThemedText';
import * as ImagePicker from 'expo-image-picker';
import { upload } from '@/assets';
import { Colors } from '@/constants/Colors';
import CustomSwitch from './ui/CustomSwitch';
import TextInputBox from './TextInput';


interface ImageUploadProps {
    setText: (text: string) => void;
    setPhoto: (photo: string) => void;
    isPrompt: boolean;
    setIsPrompt: (isPrompt: boolean) => void;
    isEnabled: boolean;
}

export default function ImageUpload({ setText, setPhoto, isPrompt, setIsPrompt, isEnabled }: ImageUploadProps) {
    const [image, setImage] = useState<string | null>(null);
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const pickImage = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!result.granted) {
            ToastAndroid.show("Permission to access gallery is required!", ToastAndroid.BOTTOM);
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            setImage(pickerResult.assets[0].uri);
            setPhoto(pickerResult.assets[0].uri);
            console.log(pickerResult.assets[0].uri);
        }
    };

    return (
        <View className="px-4">
            <ThemedText className='text-xl font-light mt-6' colorKey='lightText'>
                Upload your image
            </ThemedText>

            <View className='items-center justify-center mt-4'>
                {!image ? (
                    <TouchableOpacity
                        onPress={pickImage}
                        className='w-[80%] h-40 border-2 border-dashed rounded-lg items-center justify-center'
                        style={{
                            borderColor: themeColors.text,
                        }}
                    >
                        <Image className='w-16 h-16' source={upload} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={pickImage}
                        className='w-[80%] h-64 items-center justify-center'
                    >
                        <Image
                            source={{ uri: image }}
                            className='w-full h-full rounded-lg'
                        />
                    </TouchableOpacity>
                )}
            </View>

            {isEnabled && <View className='flex-row items-center justify-between mt-6'>
                <ThemedText className='text-xl font-light' colorKey='lightText'>
                    Enable your custom prompt
                </ThemedText>
                <CustomSwitch onToggle={setIsPrompt} isEnabled={isPrompt} />
            </View>
            }

            {isPrompt &&
                <View>
                    <TextInputBox setPrompt={setText} />
                </View>
            }
        </View>
    );
}
