import React from "react";
import { StyleProp, ViewStyle, TextStyle, TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
    touchableStyle: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>,
    onButtonPress: () => void,
    buttonText: string
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    touchableStyle,
    textStyle,
    onButtonPress,
    buttonText
}) => {
    return(
        <TouchableOpacity style={touchableStyle} onPress={onButtonPress}>
            <Text style={textStyle}>{buttonText}</Text>
        </TouchableOpacity>
    );
};