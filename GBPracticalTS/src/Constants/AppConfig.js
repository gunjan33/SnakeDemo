import { Metrics } from "../Themes";
const defaultPadding = 40
const matrixGrid = 26
const AppConfig = {
    defaultPadding: defaultPadding,
    matrixGrid: matrixGrid,
    dotSize: parseInt((Metrics.screenWidth - defaultPadding) / matrixGrid),
    pixelCalculatedHW: (parseInt((Metrics.screenWidth - defaultPadding) / matrixGrid) * matrixGrid),
    snakeInitalPos : {
        x: 3,
        y: 13,
        length: 3,
        direction: 'ltr',
        dotPos: [0,0]
      }
}

export default AppConfig;