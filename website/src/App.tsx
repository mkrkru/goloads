import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { AnalyticsComponent } from './adminpanel/analytics/AnalyticsComponent';

function App() {
  return (
    <AdminPanelLayout barComponents={[
      new AnalyticsComponent({})
    ]}/>
  );
}

export default App;
