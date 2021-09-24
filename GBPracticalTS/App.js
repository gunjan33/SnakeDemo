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
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import RandomDot from './src/Components/RandomDot';
import Snake from './src/Components/Snake';
import AppConfig from './src/Constants/AppConfig';
import { ApplicationStyles } from './src/Styles';
import { Images, Metrics } from './src/Themes';

const defaultSnakeLength = AppConfig.dotSize * AppConfig.snakeInitalPos.length
const defaultSnakeLeftPos = AppConfig.dotSize * AppConfig.snakeInitalPos.x
const defaultSnakeTopPos = AppConfig.dotSize * AppConfig.snakeInitalPos.y
const initialSnakeData = [
  [(defaultSnakeLeftPos - (AppConfig.dotSize * 2)), defaultSnakeTopPos],
  [(defaultSnakeLeftPos - AppConfig.dotSize), defaultSnakeTopPos],
  [defaultSnakeLeftPos, defaultSnakeTopPos]]

const App = () => {

  const [currentScore, setCurrentScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [snakeSpeed, setSnakeSpeed] = useState(1)
  const [snakeDirection, setSnakeDirection] = useState(AppConfig.snakeInitalPos.direction)
  const timeoutRef = useRef()
  const intervalRef = useRef()
  const [snakeData, setSnakeData] = useState(initialSnakeData)
  const [snakeRandomDotPos, setSnakeRandomDotPos] = useState(AppConfig.snakeInitalPos.dotPos)


  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      resetDotToNewPos()
      setTimeout(() => {
        addSpeedInterval()
      }, 300);
    }
    else{
      stopGame()
    }
  }, [isPlaying])


  useEffect(() => {
    if (isPlaying) {
      addSpeedInterval()
    }
  }, [snakeDirection])

  const startGame = () => {
    addTimeObserver()
    console.log('snakeData', snakeData);
  }

  const addTimeObserver = () => {
    // 40 sec
    if (timeoutRef) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      resetDotToNewPos()
    }, 40 * 1000);
  }

  const addSpeedInterval = () => {
    // Fire every (speed) sec    
    if (intervalRef) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      moveSnake()
    }, 400 / snakeSpeed);
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
    resetDotPos()
  }

  const resetDotToNewPos = () => {

    const posOne = getRandomNo()
    const posTwo = getRandomNo()

    setSnakeRandomDotPos([posOne,posTwo])
  }


  const resetDotPos = () => {
    setSnakeData([...initialSnakeData])
    setSnakeRandomDotPos([0,0])
    setSnakeDirection('ltr')
    setSnakeSpeed(1)
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
    const calculatedPos = parseInt((Math.random() * AppConfig.matrixGrid)) * AppConfig.dotSize
    if (calculatedPos > (AppConfig.pixelCalculatedHW - AppConfig.dotSize)) {
      return AppConfig.pixelCalculatedHW - AppConfig.dotSize
    }
    return calculatedPos
  }

  const onPressNavButton = (type) => {
    if ((type == 'ltr' || type == 'rtl') && snakeDirection != 'ltr' && snakeDirection != 'rtl') {
      setSnakeDirection(type) 
    }
    if ((type == 'ttb' || type == 'btt') && snakeDirection != 'ttb' && snakeDirection != 'btt') {
      setSnakeDirection(type) 
    }
  }

  function moveSnake() {
    setSnakeData((snakeData) => {
      let currentSnakePosData = [...snakeData]
      let initialPos = currentSnakePosData[currentSnakePosData.length - 1]
      let xyMaxPos = parseInt(AppConfig.dotSize * (AppConfig.matrixGrid))
      let xyMinPos = 0
      // checkForHit(currentSnakePosData)
      
      if (parseInt(initialPos[0]) >= xyMaxPos && snakeDirection === 'ltr') {  
        initialPos[0] = xyMinPos
      }
      else if (parseInt(initialPos[1]) >= (xyMaxPos - AppConfig.dotSize) && snakeDirection === 'ttb') {  
        initialPos[1] = xyMinPos
      }
      else if (parseInt(initialPos[0]) <= xyMinPos && snakeDirection === 'rtl') {  
        initialPos[0] = xyMaxPos
      }
      else if (parseInt(initialPos[1]) <= xyMinPos && snakeDirection === 'btt') {  
        initialPos[1] = xyMaxPos - AppConfig.dotSize
      }
      else {
        switch (snakeDirection) {
          case 'ltr':
            initialPos = [(initialPos[0] + AppConfig.dotSize), initialPos[1]]
            break;
          case 'rtl':
            initialPos = [(initialPos[0] - AppConfig.dotSize), initialPos[1]]
            break;
          case 'btt':
            initialPos = [initialPos[0], (initialPos[1] - AppConfig.dotSize)]
            break;
          case 'ttb':
            initialPos = [initialPos[0], (initialPos[1] + AppConfig.dotSize)]
            break;
          default:
            break;
        }
      }
      currentSnakePosData.push(initialPos)


      if (initialPos[0] == snakeRandomDotPos[0] && initialPos[1] == snakeRandomDotPos[1]) {        
        resetDotToNewPos()
        setSnakeSpeed(snakeSpeed => parseInt(currentScore/5))
        setCurrentScore(currentScore => currentScore + 1)
      }
      else{
        currentSnakePosData.shift()
      }
      // console.log('currentSnakePosData',currentSnakePosData);
      return currentSnakePosData
    })
  }

  checkForHit = (data) => {
    let currentSnakePosData = [...data]
    let initialPos = currentSnakePosData[currentSnakePosData.length - 1]
    currentSnakePosData.pop()
    currentSnakePosData.forEach((item) => {
      if (initialPos[0] == item[0] && initialPos[1] == item[1]) {         
        const score = currentScore
        alert(`Your score is ${score}`)
        stopGame()    
      }
    })
  }


  renderSnakeNavigationView = () => {
    return (
      <View style={ApplicationStyles.navButtonsContainer}>
        <View style={[ApplicationStyles.navButtonContainer, ApplicationStyles.upDownButtonContainer]}>
          <Pressable style={ApplicationStyles.navButton} onPress={() => onPressNavButton('btt')}>
            <Image source={Images.up_icon} style={ApplicationStyles.startStopIcon} />
          </Pressable>
        </View>
        <View style={[ApplicationStyles.navButtonContainer, ApplicationStyles.leftRightButtonContainer]}>
          <View style={ApplicationStyles.leftSubContainer}>
            <Pressable style={ApplicationStyles.navButton} onPress={() => onPressNavButton('rtl')}>
              <Image source={Images.left_icon} style={ApplicationStyles.startStopIcon} />
            </Pressable>
          </View>
          <View style={ApplicationStyles.leftSubContainer}>
            <Pressable style={ApplicationStyles.navButton} onPress={() => onPressNavButton('ltr')}>
              <Image source={Images.right_icon} style={ApplicationStyles.startStopIcon} />
            </Pressable>
          </View>
        </View>
        <View style={[ApplicationStyles.navButtonContainer, ApplicationStyles.upDownButtonContainer]}>
          <Pressable style={ApplicationStyles.navButton} onPress={() => onPressNavButton('ttb')}>
            <Image source={Images.down_icon} style={ApplicationStyles.startStopIcon} />
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={ApplicationStyles.SafeAreaContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={ApplicationStyles.container}>
        <View style={ApplicationStyles.matrixGridContainer}>
          <View style={ApplicationStyles.matrixGrid(AppConfig.pixelCalculatedHW)}>
            <RandomDot left={snakeRandomDotPos[0]} top={snakeRandomDotPos[1]} />
            <Snake snakePosData={snakeData} />
          </View>
          <View style={ApplicationStyles.startStopContainer}>
            <Text>Start/Stop</Text>
            <View style={[ApplicationStyles.flexDirRow]}>
              <Pressable style={ApplicationStyles.startStopButton} onPress={onPressStartStop}>
                <Image source={Images.playPause_icon} style={ApplicationStyles.startStopIcon} />
              </Pressable>
              <View style={ApplicationStyles.scoreContainer}>
                <Text>Score:{currentScore}</Text>
              </View>
            </View>
          </View>
        </View>
        {renderSnakeNavigationView()}
      </View>
    </SafeAreaView>
  );
};

export default App;
