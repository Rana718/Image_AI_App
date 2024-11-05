import { Colors } from "@/constants/Colors"
import { View, Text, useColorScheme } from "react-native"
import Auth from "./auth";



export default function Home() {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <View>
            <Auth/>
        </View>
    )
}



