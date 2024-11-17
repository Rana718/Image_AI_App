import { View } from "react-native"
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";



export default function Home() {
    const {user} = useUser();

    return (
        <View>
            {!user? <Redirect href={'/auth'}/>: <Redirect href={'/home'}/>}
        </View>
    )
}



