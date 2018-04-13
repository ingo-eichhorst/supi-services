
// CONFIG

// Empty string means same protocol, host and port
// const BASE_URL = "http://192.168.188.200:3000"
const BASE_URL = ""

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './vendor/bootstrap.css';
// import { BrowserRouter } from 'react-router-dom'

console.log(window)

// const { ToastContainer, toast } =

const Provider = ReactRedux.Provider
const connect = ReactRedux.connect

/* REDUX */
const { createStore } = Redux
const initialState = {
  articles: [],
  systems: {
    led: {},
    fan: {}
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, action.payload]
      }
    case 'SET_SYSTEM_STATE':
      let newState = {...state}
      console.log(action)
      if (action.payload.mode) {
        console.log(newState.systems[action.payload.system])
        newState.systems[action.payload.system][action.payload.mode] = action.payload.value
      }
      else newState.systems[action.payload.system] = action.payload.value
      return newState
    default:
      return state
  }
}
const store = createStore(reducer)

// Action creator
const addArticle = article => ({ 
  type: "ADD_ARTICLE", 
  payload: {
    name: article,
    id: Math.random()
  }
})

const setSystemState = (system, mode, value) => ({ 
  type: "SET_SYSTEM_STATE",
  payload: {
    system,
    mode,
    value,
    id: Math.random()
  } 
})

const mapStateToProps = state => {
  return { 
    articles: state.articles, 
    systems: state.systems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article)),
    setSystemState: (system, mode, value) => dispatch(setSystemState(system, mode, value))
  }
}

const ConnectedList = ({ articles, systems }) => (
  <div>
    <p>{systems.led.c}</p>
    <ul className="list-group list-group-flush">
      {articles.map(el => (
        <li className="list-group-item" key={el.id}>
          {el.name}
          <button className="btn btn-dark">
            <i className="fas fa-times"></i>
          </button>
        </li>
      ))}
    </ul>
  </div>
)
const List = connect(mapStateToProps)(ConnectedList)


const MOUNT_NODE = document.getElementById('app');

const Router = ReactRouterDOM.BrowserRouter
const Link = ReactRouterDOM.Link
const Route = ReactRouterDOM.Route

class Header extends React.Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/">
            <button className="btn btn-dark">
              SuPi Admin  
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="btn btn-dark">
              <i className="fas fa-tachometer-alt"></i>
            </button>
          </Link>
          <Link to="/control">
            <button className="btn btn-dark">
              <i className="fas fa-keyboard"></i>
            </button>
          </Link>
          <Link to="/settings">
            <button className="btn btn-dark">
              <i className="fas fa-cogs"></i>
            </button>
          </Link>
          <Link to="/user">
            <button className="btn btn-dark">
              <i className="fas fa-user"></i>
            </button>
          </Link>
        </nav>
      </header>
    )
  }
}

let loginFormStyle = {
  maxWidth: "300px",
  margin: "auto"
}

class Login extends React.Component {
  login() {
    console.log('login')
    sessionStorage.setItem('token', 123)
    location.pathname = '/'
  }
  render() {
    return (
      <div className="container" style={{marginTop: "16px"}}>
        <h1>LOGIN</h1>
        <form style={loginFormStyle}>
          <div className="form-group">
            <label forhtml="username">User Name</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="form-group">
            <label forhtml="password">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
        </form>
      </div>
    )
  }
}


class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      status: {}
    };
  }

  componentDidMount () {
    fetch(BASE_URL+'/api/hardware/status', {mode: 'cors'})
      .then(response => {
        return status = response.status < 400 ? response.json() : response.status
      })
      .then(status => this.setState({status}))
      .catch(e => this.setState({status: e.message}))
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{JSON.stringify(this.state)}</p>
      </div>
    )
  }
}

class ControlContent extends React.Component {

  constructor() {
    super();
    this.state = {
      fanSpeed: 0,
      fanMode: "c",
      ledDuration: -1,
      ledMode: "auto",
    };
    this.add = this.add.bind(this)
    this.control = this.control.bind(this)
    this.shutdown = this.shutdown.bind(this)
  }

  add() {
    this.props.addArticle('test')
  }

  control (system, mode, value) {
    fetch(`${BASE_URL}/api/hardware/control?system=${system}&mode=${mode}&value=${value}`)
      .then(response => {
        console.log(system, mode, value)
        if (response.status > 400) return this.props.setSystemState(system, mode, value)
        else return this.props.addArticle('error while request')
      })
      .catch(e => console.error(e))
  }

  shutdown () {
    fetch(`${BASE_URL}/api/hardware/shutdown`)
      .then(response => {
        return this.props.addArticle('System shutting down ...')
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div>
        <button onClick={this.add} className="btn btn-success btn-lg">
          SAVE
        </button>
        <div>
          <span>
            Duration
            <input id="led-duration" type="range" min="-1" max="10000" step="100" 
            value={this.state.ledDuration} onChange={e => this.setState({ledDuration: e.target.value})} />
          </span>
          <span>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="ledRadios" id="led1" 
              onChange={e => this.setState({ledMode: 'k'})} />
              <label className="form-check-label" htmlFor="led1">
                Knight Rider
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="ledRadios" id="led2" 
              onChange={e => this.setState({ledMode: 'c'})} />
              <label className="form-check-label" htmlFor="led2">
              Confetti
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="ledRadios" id="led3" 
              onChange={e => this.setState({ledMode: 'j'})} />
              <label className="form-check-label" htmlFor="led3">
              Jiggle
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="ledRadios" id="led4" 
              onChange={e => this.setState({ledMode: 'r'})} />
              <label className="form-check-label" htmlFor="led4">
              Rainbow
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="ledRadios" id="led5" 
              onChange={e => this.setState({ledMode: 'b'})} />
              <label className="form-check-label" htmlFor="led5">
              BPM
              </label>
            </div>
          </span>
        </div>
        <button onClick={() => this.control('led', this.state.ledMode, this.state.ledDuration)} className="btn btn-success btn-lg">
          Set LED
        </button>
        
        <div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="fan" id="fanRadio1"
            onChange={e => this.setState({fanMode: 'auto'})} />
            <label className="form-check-label" htmlFor="fanRadio1">
              Auto
            </label>
          </div>
          <div className="form-check disabled">
            <input className="form-check-input" type="radio" name="fan" id="fanRadio2"
            onChange={e => this.setState({fanMode: 'manual'})} />
            <label className="form-check-label" htmlFor="fanRadio2">
              Manual
            </label>
            <span>
              Speed
              <input id="fan-speed" type="range" min="0" max="255" step="5" 
              value={this.state.fanSpeed} onChange={e => this.setState({fanSpeed: e.target.value})} />
            </span>
          </div>
        </div>
        <button onClick={() => this.control('fan', this.state.fanMode, this.state.fanSpeed)} className="btn btn-success btn-lg">
          Set Fan
        </button>

        <div>
          <button onClick={this.shutdown} className="btn btn-danger btn-lg">
            Shutdown
          </button>
        </div>
      </div>
    )
  }
}

const Control = connect(null, mapDispatchToProps)(ControlContent);


class User extends React.Component {

  logout() {
    console.log('logout')
    sessionStorage.removeItem('token')
    location.pathname = '/'
  }

  render() {
    return (
      <div>
        <h1>User</h1>
        <button type="submit" className="btn btn-primary" onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

class Settings extends React.Component {

  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    )
  }
}

let contentStyle = {
  paddingBottom:'80px',
  marginTop: '16px'
}

class Content extends React.Component {

  render() {
    let token = sessionStorage.getItem('token')
    console.log('TOKEN:', token)
    if(!token) return (
      <section className="container" style={contentStyle}>
        <Login />
      </section>
    )
    else return (
      <section className="container" style={contentStyle}>
        <Route exact={true} path="/" render={()=>(<Dashboard />)} />      
        <Route path="/dashboard" render={()=>(<Dashboard />)} />
        <Route path="/control" render={()=>(<Control />)} />
        <Route path="/settings" render={()=>(<Settings />)} />
        <Route path="/user" render={()=>(<User />)} />
      </section>
    )
  }
}


let footerStyle = {
  "bottom": 0,
  "position": "absolute",
  "width": "100%",
  "background": "#303030",
  "marginTop": "16px"
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={footerStyle}>
        <p className="text-center" style={{marginTop: "16px"}}>
          Copyright {(new Date()).getFullYear()} - Ingo Eichhorst
        </p>
      </footer>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{minHeight:'100%',position:'relative'}}>
            <Header />
            <List />
            <Content />
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, MOUNT_NODE)
