import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SnakeDot from "./SnakeDot";

const screenDimen = Dimensions.get("window")
const pixelCalculatedHW = parseInt((screenDimen.width - 40) / 26)

export default function Snake({ snakePosData = [] }) {
    return (
        <>
        {snakePosData.map((item,index) => {
            return <SnakeDot key={`${index}`} left={item[0]} top={item[1]} />
        })}
        </>
    )
}
