import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const screenDimen = Dimensions.get("window")
const pixelCalculatedHW = parseInt((screenDimen.width - 40) / 26)
const defaultLength = pixelCalculatedHW * 3

export default function SnakeDot({ top, left }) {
    return (
        <View style={[styles.snake, styles.setTopLeft(top, left)]} />
    )
}

const styles = StyleSheet.create({
    snake: {
        backgroundColor: 'black',
        position: 'absolute',
        borderColor:'white',
        borderWidth:1,
        width: pixelCalculatedHW,
        height: pixelCalculatedHW
    },
    setTopLeft: (topPos, leftPos) => {
        return {
            top: topPos,
            left: leftPos,
        }
    }
})