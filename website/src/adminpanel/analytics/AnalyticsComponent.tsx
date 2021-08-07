import React from 'react';
import { AdminPanelBarComponent } from '../Layout';
import { ClickAnalytics } from './click/ClickAnalytics';
import './Analytics.css';

interface AnalyticsComponentProps {
    clicksData : number[][]
}

export class AnalyticsComponent extends React.Component<AnalyticsComponentProps> implements AdminPanelBarComponent {
    
    icon() {
        return <div></div>
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