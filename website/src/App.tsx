import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { AnalyticsComponent } from './adminpanel/analytics/AnalyticsComponent';

function App() {
  return (
    <AdminPanelLayout barComponents={[
      new AnalyticsComponent({clicksData : [
        [26, 19],
        [32, 31],
        [33, 10],
        [25, 32],
        [32, 12],
        [41, 29],
        [32, 23]
      ]}),
      {
        render : () => <div></div>,
        icon : () => <div></div>,
        title : "TITLE",
        path : "/hello"
      }
    ]}/>
  );
}

export default App;
