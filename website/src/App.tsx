import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { AnalyticsComponent } from './adminpanel/analytics/AnalyticsComponent';
import { FetchAnalyticsComponent } from './adminpanel/analytics/FetchAnalyticsComponent';

import AnalyticsIcon from './assets/analytics_icon.png'

function App() {
  return (
    <AdminPanelLayout barComponents={[
      {
        render : <FetchAnalyticsComponent/>,
        icon : AnalyticsIcon,
        title : "Analytics",
        path : "/analytics"
      },
      {
        render : <div></div>,
        icon : "",
        title : "TITLE",
        path : "/hello"
      }
    ]}/>
  );
}

export default App;
