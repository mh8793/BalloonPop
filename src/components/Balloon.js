// components/Balloon.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const Balloon = ({ onPress, onMiss, initialPosition, speed, color }) => {
  const [position, setPosition] = useState(initialPosition);
  const size = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    const animation = Animated.timing(size, {
      toValue: 0,
      duration: (Dimensions.get('window').height + initialPosition.y) / speed,
      useNativeDriver: false,
    });

    const intervalId = setInterval(() => {
      setPosition((prevPosition) => ({
        x: prevPosition.x,
        y: prevPosition.y - speed,
      }));

      if (position.y <= -60) {
        onMiss();
        animation.stop();
      }
    }, 16);

    return () => {
      clearInterval(intervalId);
      animation.stop();
    };
  }, [position.y, speed, initialPosition, onMiss, size]);

  const handlePress = () => {
    onPress();
    size.setValue(0);
  };

  return (
    <Animated.View
      style={[
        styles.balloon,
        {
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          borderRadius: size.interpolate({
            inputRange: [0, 60],
            outputRange: [0, 30],
          }),
          backgroundColor: color,
        },
      ]}
      onStartShouldSetResponder={() => true}
      onResponderRelease={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  balloon: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Balloon;