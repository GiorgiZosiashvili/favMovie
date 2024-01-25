import React from "react";
import "./Reset.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
const root = ReactDOM.createRoot(document.getElementById("root"));

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAeJMHswPGRMMX2KVDqG_BITtSyuYXMKnc",
  authDomain: "favmovie-726a8.firebaseapp.com",
  projectId: "favmovie-726a8",
  storageBucket: "favmovie-726a8.appspot.com",
  messagingSenderId: "202697915707",
  appId: "1:202697915707:web:82f0e98e347eedd0b0cb1e",
});

export const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("logged in");
  } else {
    console.log("No user");
  }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
