import { connect } from 'react-redux';
import Register from '../../components/Register';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    logIn: () => {
        dispatch({type: 'LOG_IN'})
    },
    error: (message) => {
        dispatch({type: 'ERROR', message: message})
    },
    newInfo: (message) => {
        dispatch({type: 'NEW_INFO', message: message})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
