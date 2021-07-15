import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
// import SnackbarProvider from 'react-simple-snackbar'
import LikeProvider from "./Contexts/like-context"
import SavedVideosProvider from "./Contexts/saved-context"
import PlaylistProvider from "./Contexts/playlist-context"
import VideosProvider from "./Contexts/videos-context"
import AuthProvider from "./Contexts/authContext"

// import { LikeProvider, SavedVideosProvider, PlaylistProvider, VideosProvider, AuthProvider } from "./Contexts/index";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideosProvider>
        <AuthProvider>
          <LikeProvider>
            <SavedVideosProvider>
              <PlaylistProvider>
                  <App />
              </PlaylistProvider>
            </SavedVideosProvider>
          </LikeProvider>
        </AuthProvider>
      </VideosProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);