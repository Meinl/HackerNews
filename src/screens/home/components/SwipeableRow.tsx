import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface SwipeableRowProps {
  children: JSX.Element;
  onPress: () => void;
}

export default function SwipeableRow({children, onPress}: SwipeableRowProps) {

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const swipeableRef = React.useRef<Swipeable>(null);

  const renderRightActions = (progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={() => {
        onPress()
        if(swipeableRef?.current) {
          swipeableRef?.current.close()
        }
      }}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform:[{scale}]}]}
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={41}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
  
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    marginBottom:10,
    width: '33%'
  }
});