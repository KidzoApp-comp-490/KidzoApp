import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NetworkStatus } from '../NetworkStatus';

const OnboardingSlide = ({ image, title, description }) => {
  return (
    <NetworkStatus>
    <View style={styles.slide}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
    </NetworkStatus>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 500,
    marginBottom: 20,
    resizeMode:'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingSlide;
