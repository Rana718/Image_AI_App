import { Animated, TouchableOpacity, View } from "react-native";


interface CustomSwitchProps{
    isEnabled: boolean;
    onToggle: (isEnabled: boolean) => void;
}

export default function CustomSwitch ({ isEnabled, onToggle }: CustomSwitchProps) {
    const translateX = new Animated.Value(isEnabled ? 20 : 0);
    const toggleSwitch = () => {
        Animated.timing(translateX, {
            toValue: isEnabled ? 0 : 20,
            duration: 200,
            useNativeDriver: true,
        }).start();

        onToggle(!isEnabled);
    };

    return (
        <TouchableOpacity
            className={`rounded-2xl justify-center overflow-hidden p-1 ${isEnabled ? "bg-tint": "bg-slate-400"}`}
            onPress={toggleSwitch}
            activeOpacity={0.8}
            style={{
                width: 50,
                height: 30,
            }}
        >
            <Animated.View 
                className={`w-6 h-6 rounded-xl ${isEnabled ? "bg-slate-400" : "bg-tint"}`}
                style={{
                    transform: [{ translateX }],
                }}
            />
        </TouchableOpacity>
    );
};