import { View, Text, useColorScheme, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ui/ThemedView';

export default function ViewPage() {
    
    //@ts-expect-error
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const params = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {

        navigation.setOptions({
            headerTitle: "Your Genrated Image",
            headerStyle: {
                backgroundColor: themeColors.background,

            },
            headerTintColor: themeColors.text,
        });
        console.log(params);

    }, [themeColors])

    return (
        <ThemedView>
            <View>
                {/* <Image source={{ params.response}}/> */}
            </View>
        </ThemedView>
    )
}