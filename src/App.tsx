import React from 'react';

import { Background } from 'components/Background';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

import './App.css';

const App: React.FC = () => {
  return (
    <Background>
      <Header />
      <Footer />
    </Background>
  );
};

export default App;
