// components/GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Balloon from './Balloon';

const GameScreen = ({ navigation }) => {
  const [timer, setTimer] = useState(120);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const balloonInterval = setInterval(() => {
      generateBalloon();
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      clearInterval(balloonInterval);
      navigation.navigate('EndScreen', { finalScore: score });
    }

    return () => {
      clearInterval(interval);
      clearInterval(balloonInterval);
    };
  }, [timer, score, navigation]);

  const generateBalloon = () => {
    const newBalloon = {
      id: Date.now(),
      position: {
        x: Math.random() * (width - 60),
        y: height + 60,
      },
      speed: 2 + (120 - timer) / 30,
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  const handleBalloonPress = (balloonId) => {
    setScore((prevScore) => prevScore + 2);
    setBalloons((prevBalloons) => prevBalloons.filter((balloon) => balloon.id !== balloonId));
  };

  const handleBalloonMiss = (balloonId) => {
    setScore((prevScore) => prevScore - 1);
    setBalloons((prevBalloons) => prevBalloons.filter((balloon) => balloon.id !== balloonId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreTimerContainer}>
        <Text style={styles.scoreTimerText}>Score: {score}</Text>
        <Text style={styles.scoreTimerText}>
          Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </Text>
      </View>
      <View style={[styles.gameContainer, { width, height }]}>
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            onPress={() => handleBalloonPress(balloon.id)}
            onMiss={() => handleBalloonMiss(balloon.id)}
            initialPosition={balloon.position}
            speed={balloon.speed}
            color={balloon.color}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  scoreTimerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scoreTimerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default GameScreen;