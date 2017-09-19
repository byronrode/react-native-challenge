import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.whenPressed} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>
        { props.children }
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#FF4081',
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 2,
    borderRadius: 50,
  }
}

//cant use deafult key if you want to export all from an index.js inside this directory
export { Button };