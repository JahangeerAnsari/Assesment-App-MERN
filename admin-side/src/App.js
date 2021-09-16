
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './container/Home';
import Signup from './container/Signup';
import Signin from './container/Signin';
import PrivateRotue from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogin } from './actions/auth.action';
import UserPage from './container/UserPage';
import AssesmentPage from './container/AssesmentPage';
import QuestionPage from './container/QuestionPage';
import { fetchedAllAssesments } from './actions/assesment.action';
import ResultPage from './container/ResultPage';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {

    
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }


    if(auth.authenticate){
      dispatch(fetchedAllAssesments());
    }
    
     
    
    
  
  }, [auth.authenticate]);


  return (
    <div className="App">

      <Switch>
        <PrivateRotue exact path="/" component={Home} />
        <PrivateRotue path="/user" component={UserPage} />
        <PrivateRotue path="/assesment" component={AssesmentPage} />
        <PrivateRotue path="/questions/:id" component={QuestionPage} />
        <PrivateRotue path="/result" component={ResultPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>

    </div>
  );
}

export default App;
