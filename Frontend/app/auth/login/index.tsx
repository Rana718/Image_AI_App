import React, { useEffect, useCallback } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import Animated, { FadeIn, FadeOut, BounceIn } from 'react-native-reanimated';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import { useNavigation } from 'expo-router';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const googleOAuth = useOAuth({ strategy: 'oauth_google' });
    const facebookOAuth = useOAuth({ strategy: 'oauth_facebook' });
    const linkedinOAuth = useOAuth({ strategy: 'oauth_linkedin' });

    const handleOAuth = useCallback(
        //@ts-expect-error
        async (startOAuthFlow) => {
            try {
                const { createdSessionId, setActive } = await startOAuthFlow({
                    redirectUrl: Linking.createURL('/(tabs)', { scheme: 'myapp' }),
                });

                if (createdSessionId) {
                    setActive!({ session: createdSessionId });
                }
            } catch (err) {
                console.error('OAuth error', err);
            }
        },
        []
    );

    return (
        <ThemedView className="flex-1 items-center justify-center p-4 bg-gray-100">
            <Animated.View entering={FadeIn.duration(800)} exiting={FadeOut} className="mb-6">
                <ThemedText className="text-3xl font-bold text-gray-800">SignIn / SignUp</ThemedText>
            </Animated.View>
            <Animated.View entering={BounceIn.delay(300)} className="w-full items-center space-y-4 gap-3">
                <CustomButton
                    title="Sign in with Google"
                    onPress={() => handleOAuth(googleOAuth.startOAuthFlow)}
                    className="bg-red-500"
                />
                <CustomButton
                    title="Sign in with Facebook"
                    onPress={() => handleOAuth(facebookOAuth.startOAuthFlow)}
                    className="bg-blue-600"
                />
                <CustomButton
                    title="Sign in with LinkedIn"
                    onPress={() => handleOAuth(linkedinOAuth.startOAuthFlow)}
                    className="bg-blue-700"
                />
            </Animated.View>
        </ThemedView>
    );
}


const CustomButton = ({ title, onPress, className }: { title: string; onPress: () => void; className: string }) => (
    <TouchableOpacity className={`w-11/12 py-3 rounded-lg items-center ${className}`} onPress={onPress}>
        <ThemedText className="text-white text-lg font-semibold">{title}</ThemedText>
    </TouchableOpacity>
);
