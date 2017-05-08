const appReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            console.log(action.type);
            return {
                ...state,
                flow: 0
            };
        case 'REGISTER':
            console.log(action.type);
            return {
            ...state,
            flow: 1,
            info: ''
          };
        case 'LOGGED_IN':
            console.log(action.type);
            return {
              user: action.user,
              token: action.token,
              flow: 2,
              info: ''
            };
        case 'ERROR':
            console.log(action.type);
            return {
              ...state,
              info: action.message
            };
        case 'SET_GROUPS':
            console.log(action.type, action.groups);
            return {
            ...state,
            groups: action.groups,
            info: 'Fetched groups'
        };
        case 'NEW_INFO':
            console.log(action.type);
            return {
                ...state,
                info: action.message
            };
        case 'LOG_OUT':
            console.log(action.type);
            return {
                flow: 0,
                info: 'Successfully logged out'
            };
        case 'SELECT_GROUP':
            console.log(action.type);
            return {
                ...state,
                selectedGroup: action.id,
                info: `Picked group with id ${action.id}`
            };
        case 'ADD_GROUP':
            console.log(action.type);
            let newGroups = null;
            if (state.groups === undefined){
                newGroups = [action.group];
            }else{
                newGroups = state.groups.concat(action.group);
            }
            return {
                ...state,
                groups: newGroups,
                info: 'Added new group'
            };
        case 'DELETE_GROUP':
            console.log(action.type);
            return {
                ...state,
                groups: state.groups.filter(group => group.group_id !== action.selectedGroupId),
                selectedGroup: undefined,
                info: 'Group deleted'
            };
        case 'SHOW_MODAL_ADD_MEMBER':
            console.log(action.type);
            return {
                ...state,
                modalAddMemberVisible: true
            };
        case 'HIDE_MODAL_ADD_MEMBER':
            console.log(action.type);
            return {
                ...state,
                modalAddMemberVisible: false
            };
        case 'SHOW_MODAL_REMOVE_MEMBER':
            console.log(action.type);
            return {
                ...state,
                modalRemoveMemberVisible: true
            };
        case 'HIDE_MODAL_REMOVE_MEMBER':
            console.log(action.type);
            return {
                ...state,
                modalRemoveMemberVisible: false
            };
    default:
      return state
  }
};

export default appReducer;