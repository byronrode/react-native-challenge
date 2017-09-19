//actions that will be used to update the state of the app

export const updateTask = (data, type, updatedTitle) => {
  return {
    type: 'update_task',
    payload: {
      type: type,
      data: data,
      update: updatedTitle
    }
  };
};

export const setFilter = (filterTask) => {
  return {
    type: 'filter_task',
    payload: filterTask
  }
}

export const toggleFilter = () => {
  return {
    type: 'toggle_filter_state'
  }
}

export const createTask = (taskTitle) => {
  return {
    type: 'create_task',
    payload: {
      "title" : taskTitle,
      "isCompleted" : false
    }
  };
};

export const removeTask = (task) => {
  return {
    type: 'remove_task',
    payload: task
  };
};

export const toggleTask = (task) => {
  return {
    type: 'toggle_task',
    payload: task
  };
};

export const setModalVisible = (toggleState) => {
  return {
    type: 'toggle_modal',
    payload: toggleState
  }
}