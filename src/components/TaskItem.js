import React from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout'
import * as actions from '../actions';

class TaskItem extends React.Component {

  render() {
    //destruct the methods from this.prop so we can just call the name of properties
    const {removeTask, updateTask, toggleTask} = this.props;
    //get the properties from the passed item on parent flat list
    let task = this.props.task.item;
    //set buttons for the item
    const swipeoutBtnsRight = [
      {
        text: 'Edit',
        onPress: () => { updateTask(task, 'requestUpdate') },
        backgroundColor: '#6c92ec'
      },
      {
        text: 'Delete',
        onPress: () => { removeTask(task) },
        backgroundColor: '#f15a5a'
      }
    ];
    const swipeoutBtnsLeft = [
      {
        text: task.isCompleted ? 'undo' : 'complete' ,
        onPress: () => { toggleTask(task) },
        backgroundColor: task.isCompleted ? '#f15a5a' : '#4dc166'
      }
    ]

    return (
      <Swipeout style={[styles.itemWrapper, { backgroundColor: task.isCompleted ? '#d3ead8' : '#ead3d6' }]} left={swipeoutBtnsLeft} 
        right={swipeoutBtnsRight} 
        autoClose={true}>

        <View style={styles.listItem}>
          <Text style={[styles.title, { textDecorationLine: task.isCompleted ? 'line-through' : 'none' }]}>{ task.title }</Text>
        </View>
      </Swipeout>
    )
  }
}

const styles = {
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    paddingLeft: 10
  },
  itemWrapper: {
    marginTop: 2,
  },
  listItem: {
    height: 70,
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
}

//get the actions to be used to update redux store on this component
export default connect(null, actions) (TaskItem);
