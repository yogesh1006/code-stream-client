import './App.css';
import { Route, Switch } from "react-router-dom";
import { Home, Playlist, LikedVideos, SavedVideos, VideoPlayer, Login, Signup } from "./Pages";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"
import { Toaster } from "react-hot-toast";
import {SideBar} from "../src/Components/SideBar/SideBar"
import { Nav } from './Components';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Nav/>
      <SideBar />
      <Switch>
        <Route exact path='/' component={Home} ></Route>
        <Route path='/login' component={Login} ></Route>
        <Route path='/register' component={Signup} ></Route>
        <Route path='/watch/:id' component={VideoPlayer}></Route>
        <PrivateRoute path='/likedvideos' component={LikedVideos}></PrivateRoute>
        <PrivateRoute path='/playlists' component={Playlist} ></PrivateRoute>
        <PrivateRoute path='/savedvideos' component={SavedVideos} ></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;