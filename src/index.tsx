import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDWLYQni7eo97WqwmIqlzeEvftm1wvA6rQ",
  authDomain: "pc-store-7551b.firebaseapp.com",
  databaseURL: "https://pc-store-7551b.firebaseio.com",
  projectId: "pc-store-7551b",
  storageBucket: "pc-store-7551b.appspot.com",
  messagingSenderId: "1034498111658"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
