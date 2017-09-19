import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';

//create component
const Header = (props) => {
  //fix header for android
  renderStatusBar =() => {
    if(Platform.OS === 'android') {
      return (
        <View style={styles.statusBar} />
      )
    }
  };

  return (
    <View>
      { this.renderStatusBar() }
      <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{ props.headerTitle }</Text>
      </View>
    </View>
  );
}

const styles = {
    headerContainer: {
        backgroundColor: '#303F9F',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        elevation: 2,
        position: 'relative',
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
    },
    statusBar: {
      height: StatusBar.currentHeight
    }
};

export { Header };