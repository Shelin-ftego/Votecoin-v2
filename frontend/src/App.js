import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Support from './components/pages/Support';
import Login from './components/pages/Login'
import Admin from './components/pages/Admin';
import Voter from './components/pages/Voter';
import Verification from './components/pages/Verification';
import Results from './components/pages/Results';
import Vcard from './components/pages/Vcard';
import Candidates from './components/pages/AddCandidate';
import ElectionS from './components/pages/ElectionS';
import Blockchain from './components/pages/Blockchain';
import ViewVoters from './components/pages/ViewVoters';
import UploadPage from './components/pages/UploadPage';


function App() {
  return (
   <>
   <Router>
      <Switch>
        <Route path = '/' exact component ={Home}/>
        <Route path='/about' component={About} />
        <Route path='/support' component={Support} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} />
        <Route path='/voter' component={Voter} />
        <Route path='/verify' component={Verification} />
        <Route path='/results' component={Results} />
        <Route path='/vcard' component={Vcard} />
        <Route path='/add-candidate' component={Candidates} />
        <Route path='/electionstatus' component={ElectionS} />
        <Route path='/blockchain' component={Blockchain} />
        <Route path='/view-voters' component={ViewVoters} />
        <Route path='/upload' component={UploadPage} />
      </Switch>
     </Router>
   </>
  );
}

export default App;
