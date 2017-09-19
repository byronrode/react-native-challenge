//initial state of the app
const intialState = {
  modalVisible: false,
  modalState: '',
  updateData: {},
  filterby: 'none',
  isFilterVisible: false,
  tasks: []
};

//set initial state and setup switch to check which action was invoked
// remember to not mutate but return a new state when ever you want to update the state
export default (state = intialState, action) => {
  switch (action.type) {
    case 'update_task':
      // update task item, gets a request in the action and then updates the state
      if(action.payload.type === 'requestUpdate') {
        return { ...state,
          modalState: 'update',
          updateData: action.payload.data,
          modalVisible: true
        };
      } else {
        // here we set the new item with the new upadated data
        return { ...state,
          modalState: '',
          updateData: {},
          tasks: [...state.tasks].map(item => {
            if(item !== action.payload.data) {
              return {
                ...item
              }
            } else {
              return {
                ...item,
                title: action.payload.update
              }
            }
          })
        };
      }
    //toggle the filter section
    case 'toggle_filter_state':
      //open and close the modal
      return { ...state,
        isFilterVisible: !state.isFilterVisible
      };
    //filter the tasks
    case 'filter_task':
      const filterTasks = {
        ...state.tasks,
        savedTasks: [...state.tasks]
      };

      const toDo = [...filterTasks.savedTasks].filter(item => !item.isCompleted);
      const complete = [...filterTasks.savedTasks].filter(item => item.isCompleted);

      switch (action.payload) {
        case 'completed':
          return {
            ...state,
            filterby: action.payload
          }
        case 'todo':
          return {
            ...state,
            filterby: action.payload
          }
        default:
          return {
            ...state,
            filterby: action.payload
          }
      }
    case 'create_task':
      //create new task item from the payload and assign a key to allow Flat list to know the id
      return {
        ...state,
        filterby: 'none',
        isFilterVisible: false,
        tasks: [...state.tasks, {
          ...action.payload,
          key: state.tasks.length
        }]
      }
    case 'remove_task':
      // remove from string = this will need to be changed to use id's at some point
      return {
        ...state,
        isFilterVisible: false,
        tasks: [...state.tasks].filter((item) => item !== action.payload)
      }
    case 'toggle_task':
      // this will toggle the state of the task to completed or not, update the state and the components
      // will check and then rerender the view accoringly to update styles
      const objIndexToggle = [...state.tasks].findIndex((obj => obj === action.payload));
      [...state.tasks][objIndexToggle].isCompleted = ![...state.tasks][objIndexToggle].isCompleted;
      return {
        ...state,
        tasks: [...state.tasks]
      }
    case 'toggle_modal':
      //open and close the modal
      return { ...state,
        modalState: 'create',
        modalVisible: action.payload
      };
    default:
      //save and overwrite every state change
      ls.save('data', state.tasks)
      return state;
  }
}

