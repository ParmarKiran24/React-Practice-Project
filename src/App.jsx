import { useState } from 'react'
import Header from './components/Header'
import "./App.css";
import Welcome from './components/Welcome';
import Programmes from './components/Programmes';
import NewsEvents from './components/NewsEvents';
import Footer from './components/Footer';

function App() {


  return (
    <div className="app-root">
      <Header />
      <Welcome />
      <Programmes />
      <NewsEvents />
      <Footer />
    </div>
  )
}

export default App
