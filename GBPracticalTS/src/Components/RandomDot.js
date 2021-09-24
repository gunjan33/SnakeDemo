import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const screenDimen = Dimensions.get("window")
const pixelCalculatedHW = (screenDimen.width - 40)/26

export default function RandomDot({top,left}){
    return(
        <View style={[styles.dot, styles.setTopLeft(top,left)]}/>
    )
}

const styles = StyleSheet.create({
    dot:{
        backgroundColor:'red',
        height: pixelCalculatedHW - 1,
        width: pixelCalculatedHW - 1,
        position: 'absolute',
        borderColor:'black',
        borderWidth: 1
    },
    setTopLeft:(topPos,leftPos) => {
        return {
            top: topPos,
            left: leftPos
        }
    }
})