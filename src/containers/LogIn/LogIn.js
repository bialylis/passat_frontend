import { connect } from 'react-redux';
import LogIn from '../../components/LogIn';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    loggedIn: (user, token) => {
        dispatch({type: 'LOGGED_IN', user: user, token: token})
    },
    signUp: () => {
        dispatch({type: 'REGISTER'})
    },
    error: (message) => {
        dispatch({type: 'ERROR', message: message})
    },
    setGroups: (groups) => {
        dispatch({type: "SET_GROUPS", groups: groups});
    },
    setForgotFlow: () => {
        dispatch({type: "FORGOT_FLOW"})
    },
    setResetFlow: () => {
        dispatch({type: "RESET_FLOW"})
    },
    setLoginFlow: () => {
        dispatch({type: "LOGIN_FLOW"})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
