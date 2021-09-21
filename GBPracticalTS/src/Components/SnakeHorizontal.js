import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const screenDimen = Dimensions.get("window")
const pixelCalculatedHW = parseInt((screenDimen.width - 40) / 26)
const defaultLength = pixelCalculatedHW * 3

export default function SnakeHorizontal({ top, left, length, direction }) {
    return (
        <View style={[styles.snake, styles.setTopLeft(top, left, length)]} />
    )
}

const styles = StyleSheet.create({
    snake: {
        backgroundColor: 'black',
        position: 'absolute'
    },
    setTopLeft: (topPos, leftPos, length) => {
        return {
            top: topPos,
            left: leftPos,
            width: length,
            height: pixelCalculatedHW,
        }
    }
})