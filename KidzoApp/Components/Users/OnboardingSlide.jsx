import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NetworkStatus } from '../NetworkStatus';

const OnboardingSlide = ({ image, title, desc,image2 }) => {
  return (
    <NetworkStatus>
    <View style={styles.slide}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <View>
      <Image source={image2} style={styles.logo} />
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
    backgroundColor:'white',
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 20,
    resizeMode:'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#0B3B63',
  },
  desc: {
    
    fontSize: 16,
    textAlign: 'center',
    color:'#0B3B63',
  },
   logo:{
    width:100,
    height:30,
    resizeMode:'contain',
    marginTop:65,
  },
});

export default OnboardingSlide;
