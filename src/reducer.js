const appReducer = (state = {loginFlow: true}, action) => {
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
                loginFlow: true,
                info: 'Successfully logged out'
            };
        case 'SELECT_GROUP':
            return {
                ...state,
                selectedGroup: action.id,
                info: `Picked group with id ${action.id}`,
                groupFlow: 1,
                encodedGroupPasswords: []
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
                modalRemoveMemberVisible: true,
                toBeRemovedId: action.id
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
                groupFlow: 1,
                encodedGroupPasswords: []
            };
        case 'GROUP_SETTINGS':
            return {
                ...state,
                groupFlow: 3
            };
        case 'SET_GROUP_DATA':
            return {
                ...state,
                groupData: action.data
            };
        case 'GROUP_PASSWORDS':
            return {
              ...state,
                groupFlow: 4
            };
        case 'SHOW_MODAL_SHOW_PASSWORD':
            return {
                ...state,
                modalShowPasswordVisible: true,
                pickedPassToShow: action.pickedPassToShow
            };
        case 'HIDE_MODAL_SHOW_PASSWORD':
            return {
                ...state,
                modalShowPasswordVisible: false
            };
        case 'SET_GROUP_PASSWORDS':
            return {
                ...state,
                encodedGroupPasswords: action.data
            };
        case 'ADD_DECRYPTED_PASS': {
            const newPasses = state.encodedGroupPasswords || [];
            const newerPasses = newPasses.map(p => {
               if(p.pass_id == action.index){
                   return action.data;
               } else {
                   return p
               }
            });
            return {
                ...state,
                encodedGroupPasswords: newerPasses
            };
        }
        case 'SHOW_RESET_KEYS_MODAL':
            return {
                ...state,
                modalShowResetKeys: true
            };
        case 'HIDE_RESET_KEYS_MODAL':
            return {
                ...state,
                modalShowResetKeys: false
            };
        case 'FORGOT_FLOW':
            return {
                ...state,
                loginFlow: false,
                forgotFlow: true,
                resetFlow: false
            };
        case 'RESET_FLOW':
            return {
                ...state,
                loginFlow: false,
                resetFlow: true,
                forgotFlow: false,
            };
        case 'LOGIN_FLOW':
            return {
                ...state,
                loginFlow: true,
                resetFlow: false,
                forgotFlow: false,
            };
    default:
      return state
  }
};

export default appReducer;