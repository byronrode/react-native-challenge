import React from 'react';
import { View, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers'
import { Header } from './src/components/common';
import TaskList from './src/components/TaskList';

//dementions of the current device's screen
var winSize = Dimensions.get('window');

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={styles.container}>
        <Header headerTitle='WhaTuDu' />
        <TaskList />
      </View>
    </Provider>
  );
}

const styles = {
  container: {
    flex: 1,
    height: winSize.height
  }
}

export default App;
