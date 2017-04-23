import { connect } from 'react-redux';
import App from '../../components/App';

const mapStateToProps = (state) => {
    console.log(state);
    return state;
};

export default connect(mapStateToProps)(App);
