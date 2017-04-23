import { connect } from 'react-redux';
import Groups from '../../components/Groups';

const mapStateToProps = (state) => {
    console.log(state);
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
    showModal: () => {
        dispatch({type: 'SHOW_MODAL'})
    },
    hideModal: () => {
        dispatch({type: 'HIDE_MODAL'})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
