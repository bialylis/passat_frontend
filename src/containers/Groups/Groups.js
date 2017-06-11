import { connect } from 'react-redux';
import Groups from '../../components/Groups';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch({type: 'LOG_OUT'})
    },
    selectGroup: (id) => () => {
        dispatch({type: 'SELECT_GROUP', id: id})
    },
    addToGroups: (group) => {
        dispatch({type: 'ADD_GROUP', group: group})
    },
    deleteFromGroups: (selectedGroupId) => {
        dispatch({type: 'DELETE_GROUP', selectedGroupId: selectedGroupId})
    },
    showAddMemberModal: () => {
        dispatch({type: 'SHOW_MODAL_ADD_MEMBER'})
    },
    hideAddMemberModal: () => {
        dispatch({type: 'HIDE_MODAL_ADD_MEMBER'})
    },
    showRemoveMemberModal: (id) => () => {
        dispatch({type: 'SHOW_MODAL_REMOVE_MEMBER', id})
    },
    hideRemoveMemberModal: () => {
        dispatch({type: 'HIDE_MODAL_REMOVE_MEMBER'})
    },
    addGroupPassword: () => {
        dispatch({type: 'ADD_GROUP_PASSWORD'})
    },
    switchToMainGroupPanel: () => {
        dispatch({type: 'SWICH_TO_MAIN_GROUP_PANEL'})
    },
    groupSettings: () => {
        dispatch({type: 'GROUP_SETTINGS'})
    },
    error: (message) => {
        dispatch({type: 'ERROR', message})
    },
    setGroupData: (data) => {
        dispatch({type: 'SET_GROUP_DATA', data})
    },
    groupPasswords: () => {
        dispatch({type: "GROUP_PASSWORDS"});
    },
    showPasswordModal: (pickedPassToShow) => () => {
        dispatch({type: "SHOW_MODAL_SHOW_PASSWORD", pickedPassToShow})
    },
    hidePasswordModal: () => {
        dispatch({type: "HIDE_MODAL_SHOW_PASSWORD"})
    },
    setGroupPasswords: (data) => {
        dispatch({type: "SET_GROUP_PASSWORDS", data})
    },
    addDecryptedPassToStore: (index, data) => {
        dispatch({type: "ADD_DECRYPTED_PASS", index, data})
    },
    showResetKeysModal: () => {
        dispatch({type: "SHOW_RESET_KEYS_MODAL"})
    },
    hideResetKeysModal: () => {
        dispatch({type: "HIDE_RESET_KEYS_MODAL"})
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
