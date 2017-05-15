const appReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                flow: 0
            };
        case 'REGISTER':
            return {
            ...state,
            flow: 1,
            info: ''
          };
        case 'LOGGED_IN':
            return {
              user: action.user,
              token: action.token,
              flow: 2,
              groupFlow: 1,
              info: ''
            };
        case 'ERROR':
            return {
              ...state,
              info: action.message
            };
        case 'SET_GROUPS':
            return {
            ...state,
            groups: action.groups,
            info: 'Fetched groups'
        };
        case 'NEW_INFO':
            return {
                ...state,
                info: action.message
            };
        case 'LOG_OUT':
            return {
                flow: 0,
                info: 'Successfully logged out'
            };
        case 'SELECT_GROUP':
            return {
                ...state,
                selectedGroup: action.id,
                info: `Picked group with id ${action.id}`
            };
        case 'ADD_GROUP':
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
            return {
                ...state,
                groups: state.groups.filter(group => group.group_id !== action.selectedGroupId),
                selectedGroup: undefined,
                info: 'Group deleted'
            };
        case 'SHOW_MODAL_ADD_MEMBER':
            return {
                ...state,
                modalAddMemberVisible: true
            };
        case 'HIDE_MODAL_ADD_MEMBER':
            return {
                ...state,
                modalAddMemberVisible: false
            };
        case 'SHOW_MODAL_REMOVE_MEMBER':
            return {
                ...state,
                modalRemoveMemberVisible: true
            };
        case 'HIDE_MODAL_REMOVE_MEMBER':
            return {
                ...state,
                modalRemoveMemberVisible: false
            };
        case 'ADD_GROUP_PASSWORD':
            return {
                ...state,
                groupFlow: 2
            };
        case 'SWICH_TO_MAIN_GROUP_PANEL':
            return {
                ...state,
                groupFlow: 1
            };
        case 'GROUP_SETTINGS':
            return {
                ...state,
                groupFlow: 3
            };
    default:
      return state
  }
};

export default appReducer;