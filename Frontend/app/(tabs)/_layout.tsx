import React, { useContext, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { House, Library, CircleUser } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { UserDetailContext } from '@/context/UserDetailContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const { user } = useUser();
    //@ts-expect-error
    const {userDetail, setUserDetail} = useContext(UserDetailContext)

    const API_KEY = process.env.EXPO_PUBLIC_BACKEND_API;

    useEffect(() => {
        if (user) {
            fetchUserData('gggk@outlok.com');
        }
    }, [user]);

    const fetchUserData = async (email: string) => {
        try {
            const response = await fetch(`${API_KEY}/user?email=${email}`);
            const data = await response.json();
            console.log('User data:', data);

            if (data.message !== 'No user found with this email') {
                setUserDetail(data[0]);
                return;
            }

            try {
                const response = await fetch(`${API_KEY}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        name: user?.fullName,
                    }),
                });
                const data = await response.json();
                console.log('User created:', data[0]);
                setUserDetail(data[0]);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF4C4C',
                tabBarStyle: {
                    paddingVertical: 10,
                    backgroundColor: themeColors.background,
                    shadowColor: '#000000',
                },
                tabBarLabelStyle: {
                    marginVertical: 5,
                },
                
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="collection"
                options={{
                    title: 'Collection',
                    tabBarIcon: ({ color, size }) => <Library color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
