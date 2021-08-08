import React from 'react';
import { AdminPanelBarComponent } from '../Layout';
import { ClickAnalytics } from './click/ClickAnalytics';
import './Analytics.css';
import AnalyticsIcon from './../../assets/analytics_icon.png';

interface AnalyticsComponentProps {
    clicksData : number[][]
}

export class AnalyticsComponent extends React.Component<AnalyticsComponentProps> implements AdminPanelBarComponent {

    title = "Analytics"
    path = "/analytics"


    icon() {
        return <img className="Circle" width="60px" height="60px" src={AnalyticsIcon}></img>
    }

    render() {
        return <div>
            <ClickAnalytics
            currentWeekColor = "#00FF00" 
            lastWeekColor = "#FF0000" 
            data = {this.props.clicksData}
            />
        </div>
    }
}