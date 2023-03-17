import React from 'react';
import { Route, Routes} from 'react-router-dom';
import  { Link } from 'react-router-dom';
import DetailNote from './pages/DetailNote';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AddPage from './pages/AddPage';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/data';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
 
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  
  
  render () {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <div className='app-container'>
          <header>
          <Link to="/">Aplikasi Catatan</Link>

          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      )
    }




    return (
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">Aplikasi Catatan</Link>
          </h1>
          <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<DetailNote />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      
        </main>
  
      </div>
    );
  }
}

export default NotesApp;