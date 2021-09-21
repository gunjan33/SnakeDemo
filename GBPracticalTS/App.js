/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  InteractionManager
} from 'react-native';
import RandomDot from './src/Components/RandomDot';
import SnakeHorizontal from './src/Components/SnakeHorizontal';
import SnakeVertical from './src/Components/SnakeVertical';

const screenDimen = Dimensions.get("window")
const defaultPadding = 40
const matrixGrid = 26
const dotSize = parseInt((screenDimen.width - defaultPadding) / matrixGrid)
const pixelCalculatedHW = (dotSize * matrixGrid)
const snakeInitalPos = {
  x: 3,
  y: 13,
  length: 3,
  direction: 'ltr'
}
const defaultSnakeLength = dotSize * snakeInitalPos.length
const defaultSnakeLeftPos = dotSize * snakeInitalPos.x
const defaultSnakeTopPos = dotSize * snakeInitalPos.y

const playPause_icon = require('./src/Images/play_pause.png')
const up_icon = require('./src/Images/arrow-up.png')
const down_icon = require('./src/Images/arrow-down.png')
const left_icon = require('./src/Images/arrow-left.png')
const right_icon = require('./src/Images/arrow-right.png')



const App = () => {

  const [currentScore, setCurrentScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [dotTop, setDotTop] = useState(0)
  const [dotLeft, setDotLeft] = useState(0)
  const [snakePostop, setSnakPosTop] = useState(defaultSnakeTopPos)
  const [snakePosLeft, setSnakPosLeft] = useState(defaultSnakeLeftPos)
  const [snakeLength, setSnakLength] = useState(defaultSnakeLength)
  const [snakeSpeed, setSnakSpeed] = useState(1)
  const [snakeDirection, setSnakeDirection] = useState(snakeInitalPos.direction)
  const timeoutRef = useRef()
  const intervalRef = useRef()

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  const startGame = () => {
    resetDotPos()
    addTimeObserver()
    addSpeedInterval()
  }

  const addTimeObserver = () => {
    // 40 sec
    if (timeoutRef) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      resetDotPos()
    }, 40 * 1000);
  }

  const addSpeedInterval = () => {
    // Fire every (speed) sec    
    if (intervalRef) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      moveSnake()
    }, 1000);
  }

  const clearTimers = () => {

    if (timeoutRef) {
      clearTimeout(timeoutRef.current)
    }

    if (intervalRef) {
      clearInterval(intervalRef.current)
    }
  }


  const stopGame = () => {
    clearTimers()

    if (intervalRef) {
      clearInterval(intervalRef.current)
    }

    setDotTop(0)
    setDotLeft(0)
  }

  const resetDotPos = () => {

    const topPos = getRandomNo()
    const leftPos = getRandomNo()
    setDotTop(topPos)
    setDotLeft(leftPos)
  }

  const onPressStartStop = () => {
    if (isPlaying) {
      startGame()
    } else {
      stopGame()
    }
    setIsPlaying(!isPlaying)
  }

  const getRandomNo = () => {
    const calculatedPos = parseInt((Math.random() * matrixGrid)) * dotSize
    if (calculatedPos > (pixelCalculatedHW - dotSize)) {
      return pixelCalculatedHW - dotSize
    }
    return calculatedPos
  }

  const onPressNavButton = (type) => {
    switch (type) {
      case 'left':
        clearTimers()
        setSnakeDirection('rtl')
        break;
      case 'right':
        clearTimers()
        setSnakeDirection('ltr')
        break;
      case 'up':
        clearTimers()
        setSnakeDirection('btt')
        break;
      case 'down':
        clearTimers()
        setSnakeDirection('ttp')
        break;
      default:
        break;
    }
    addTimeObserver()
    addSpeedInterval()
    console.log('onPressNavButton ->', snakeDirection);
  }

  function moveSnake() {
    switch (snakeDirection) {
      case 'ltr':
          setSnakPosLeft((snakePosLeft) => {
            if ((snakePosLeft) + snakeLength <= pixelCalculatedHW) {
              return snakePosLeft + (dotSize * snakeSpeed)
            }
            else{
              return 0
            }
          })
        break;
      case 'rtl':
          setSnakPosLeft((snakePosLeft) => {
            if ((snakePosLeft) - dotSize >= dotSize) {
              return snakePosLeft - (dotSize * snakeSpeed)
            }
            else{
              return pixelCalculatedHW - snakeLength
            }
          })
        break;
      case 'ttb':
        setSnakPosTop((snakePostop) => {
          if ((snakePostop) + snakeLength <= pixelCalculatedHW) {
            return snakePostop + (dotSize * snakeSpeed)
          }
          else{
            return 0
          }
        })        
        break;
      case 'btt':
        setSnakPosTop((snakePostop) => {
          if ((snakePostop) - dotSize >= dotSize) {
            return snakePostop + (dotSize * snakeSpeed)
          }
          else{
            return pixelCalculatedHW - snakeLength
          }
        })        
        break;
      default:
        break;
    }
  }

  const splitSnakeForDirectionChange = () => {

  }


  return (
    <SafeAreaView style={styles.SafeAreaContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.matrixGridContainer}>
          <View style={styles.matrixGrid}>
            <RandomDot top={dotTop} left={dotLeft} />
            <SnakeHorizontal top={snakePostop} left={snakePosLeft} length={snakeLength} />
            {/* <SnakeVertical top={snakePostop} left={snakePosLeft} length={snakeLength} /> */}
          </View>
          <View style={styles.startStopContainer}>
            <Text>Start/Stop</Text>
            <View style={[styles.flexDirRow]}>
              <Pressable style={styles.startStopButton} onPress={onPressStartStop}>
                <Image source={playPause_icon} style={styles.startStopIcon} />
              </Pressable>
              <View style={styles.scoreContainer}>
                <Text>Score:{currentScore}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.navButtonsContainer}>
          <View style={[styles.navButtonContainer, styles.upDownButtonContainer]}>
            <Pressable style={styles.navButton} onPress={() => onPressNavButton('up')}>
              <Image source={up_icon} style={styles.startStopIcon} />
            </Pressable>
          </View>
          <View style={[styles.navButtonContainer, styles.leftRightButtonContainer]}>
            <View style={styles.leftSubContainer}>
              <Pressable style={styles.navButton} onPress={() => onPressNavButton('left')}>
                <Image source={left_icon} style={styles.startStopIcon} />
              </Pressable>
            </View>
            <View style={styles.leftSubContainer}>
              <Pressable style={styles.navButton} onPress={() => onPressNavButton('right')}>
                <Image source={right_icon} style={styles.startStopIcon} />
              </Pressable>
            </View>
          </View>
          <View style={[styles.navButtonContainer, styles.upDownButtonContainer]}>
            <Pressable style={styles.navButton} onPress={() => onPressNavButton('down')}>
              <Image source={down_icon} style={styles.startStopIcon} />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaContainer: {
    flex: 1
  },
  container: {
    marginTop: 32,
    flex: 1,
  },
  matrixGridContainer: {
    height: screenDimen.height * 0.6
  },
  matrixGrid: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
    height: pixelCalculatedHW
  },
  navButtonsContainer: {
    backgroundColor: 'gray',
    height: screenDimen.height * 0.4
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
    height: (screenDimen.height * 0.3) / 3,
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

export default App;
