import { StyleSheet } from "react-native";
import { Metrics } from "../Themes";

const ApplicationStyles = StyleSheet.create({
    SafeAreaContainer: {
        flex: 1
    },
    container: {
        marginTop: 32,
        flex: 1,
    },
    matrixGridContainer: {
        height: Metrics.screenHeight * 0.6
    },
    matrixGrid: (pixelCalculatedHW) => {
        return {
            borderColor: 'black',
            borderWidth: 1,
            margin: 20,
            height: pixelCalculatedHW
        }
    },
    navButtonsContainer: {
        backgroundColor: 'gray',
        height: Metrics.screenHeight * 0.4
    },
    startStopContainer: {
        padding: 20
    },
    flexDirRow: {
        flexDirection: 'row',
    },
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    startStopButton: {
        backgroundColor: 'blue',
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'red',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    startStopIcon: {
        height: 25,
        width: 25,
        resizeMode: 'center',
        tintColor: 'red'
    },
    navButtonContainer: {
        height: (Metrics.screenHeight * 0.3) / 3,
    },
    upDownButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftRightButtonContainer: {
        flexDirection: 'row',
    },
    navButton: {
        backgroundColor: 'blue',
        height: 40,
        width: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSubContainer: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ApplicationStyles