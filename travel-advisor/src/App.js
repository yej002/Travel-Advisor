import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import './App.css';
import Home from "./routes/home/home.component";
import TRAVEL from "./routes/travelogues/travelogues.component";
import NewTravelogue from "./routes/newtravelogue/newtravelogue.component";
import CONTACT from "./routes/contact/contact.component";
import TravelogueDetails from './routes/viewtravelogue/viewtravelogue.component';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <Routes>
          <Route path='/' element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path='travelogues' element={<TRAVEL />} />
              <Route path='newtravelogue' element={<NewTravelogue />} />
              <Route path='contact' element={<CONTACT />} />
              <Route path='travelogues/:id' element={<TravelogueDetails />} />
          </Route>
      </Routes>
  );
}

export default App;
