import React from 'react';
import { Modal, FlatList, View, Text, Image, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button } from './common';
import TaskItem from './TaskItem';
import * as actions from '../actions';

class TaskList extends React.PureComponent {
  //this is keep the state of the text that will be in input (update/add)
  inputText = {
    taskTitle: ''
  }

  //the component that will render the items
  renderItem(CurrentTask) {
    return <TaskItem task={CurrentTask} />
  }
  //conditions to check if there are tasks on screen (show message/ show tasks)
  tasksAvailability() {
    if(this.props.tasksLength) {
      return (
        //render list
        <View>
          { this.filterToggle() }
          <FlatList
            data={this.props.tasks}
            renderItem={(item) => this.renderItem(item)}
          />
        </View>
      )
    }
    else {
      return (
        //render no items show message
        <View style={styles.noTasksWrapper}>
          <Image style={styles.noTasksAvailImg} source={{ uri: 'http://www.iconsdb.com/icons/preview/dim-gray/checked-checkbox-xxl.png'}}/>
          <Text style={styles.noTasksAvailText}>No Tasks Found</Text>
        </View>
      )
    }
  }

  //method that will take text from input and then a type that will be used in action to udpate redux store
  //or create a new item
  taskMethod(taskTitle, type) {
      if(type === 'update') {
        this.props.updateTask(this.props.updateData, null, taskTitle);
        this.props.setModalVisible(false)
      } else {
        this.props.createTask(taskTitle);
        this.props.setModalVisible(false)
      }
  }

  //filter button to show/hide options
  filterToggle = () => {
    if(this.props.isFilterVisible){
      return (
        <View style={styles.filterWrapper}>
          <Picker
            selectedValue={this.props.filterby}
            onValueChange={(itemValue, itemIndex) => this.props.setFilter(itemValue)}>
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="To Do" value="todo" />
          </Picker>
        </View>
      ) 
    } 
    else {
      return (
        <View style={styles.informationWrapper}>
          <Text style={styles.information}>
            {this.props.tasks.length ? '<- swipe task ->' : ''}
          </Text>
        </View>
      )
    }
  }

  //render filter button if there are tasks
  filterToggleBtn = () => {
    if(this.props.tasksLength) {
      return (
        <View style={styles.filterControls}>
          <Button whenPressed={() => this.props.toggleFilter()}>
            <Image style={styles.filterIcon} source={{ uri: 'http://www.iconsdb.com/icons/preview/white/empty-filter-xxl.png'}}/>
          </Button>
        </View>
      )
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        { this.tasksAvailability() }
        <View style={styles.addControls}>
          { this.filterToggleBtn() }
          <Button whenPressed={() => this.props.setModalVisible(true)}> + </Button>
        </View>
        
        <Modal animationType="slide"
          transparent={false}
          visible={ this.props.modalVisible }
          onRequestClose={() => { this.props.setModalVisible(false)}} >
            <View style={styles.modalContainer}>
              <View style={styles.inputTask}>
                <Text style={styles.modalTitle}>Task Name</Text>
                <TextInput
                  style={{height: 60, alignSelf: 'stretch', paddingLeft: 10, color: '#fff'}}
                  onChangeText={(text) => this.inputText.taskTitle = text} />
              </View>
              <View style={styles.modalControls}>
                <Button whenPressed={() => this.taskMethod(this.inputText.taskTitle, this.props.modalState)}> > </Button>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
};

const styles = {
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#255da9'
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  },
  informationWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  information: {
    fontSize: 28,
    color: '#ccc',
    alignSelf: 'center',
    minHeight: 50,
    position: 'relative',
    top: 5
  },
  filterWrapper: {
    minHeight: 30
  },
  inputTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addControls: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  filterControls: {
    position: 'absolute',
    bottom: 70
  },
  noTasksWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3
  },
  noTasksAvailText: {
    fontSize: 30,
    color: '#666',
    fontWeight: 'bold',
    paddingTop: 10
  },
  noTasksAvailImg: {
    width: 150,
    height: 150,
  },
  filterIcon: {
    width: 90,
    height: 90
  }
}

//mapStateToProps to get current state and set to props to be accessable on this component
const mapStateToProps = (state) => {
  const tasks = state.tasksData.tasks,
    hasTasks = tasks.length > 0,
    filterby = state.tasksData.filterby;

  let taskItems = [];

  if(filterby === 'completed') {
    tasks.map(item => {
      if(item.isCompleted) {
        taskItems.push(item)
      }
    })
  } else {
    if(filterby === 'todo') {
      tasks.map(item => {
        if(!item.isCompleted) {
          taskItems.push(item)
        }
      })
    }
  }

  //get tasks but check filter
  const visibleTasks = (taskItems.length > 0) ? taskItems : tasks;
  return {
    tasks: visibleTasks,
    tasksLength: hasTasks,
    modalVisible: state.tasksData.modalVisible,
    modalState: state.tasksData.modalState,
    updateData: state.tasksData.updateData,
    filterby: filterby,
    isFilterVisible: state.tasksData.isFilterVisible
  }
}

//get current state and action methods on component
export default connect( mapStateToProps, actions ) (TaskList);