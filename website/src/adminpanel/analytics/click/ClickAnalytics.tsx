import React from 'react';
import { ClickAnalyticsChart } from './ClickAnalyticsChart';
import { ClickAnalyticsText } from './ClickAnalyticsText';

interface ClickAnalyticsProps {
    data : number[][],
    lastWeekColor : string,
    currentWeekColor : string
}

export class ClickAnalytics extends React.Component<ClickAnalyticsProps> {

    render() {
        return <div className = "ClickAnalyticsBox">
            <ClickAnalyticsChart 
            lastWeekColor = {this.props.lastWeekColor} 
            currentWeekColor = {this.props.currentWeekColor} 
            data = {this.props.data}
            />
            <ClickAnalyticsText
            lastWeekColor = {this.props.lastWeekColor}
            currentWeekColor = {this.props.currentWeekColor}
            data = {this.props.data}
            />
        </div>
    }

}