import React from 'react';
import { AnalyticsData, FullAnalyticsData } from '../../../back/AnalyticsData';
import { ClickAnalyticsChart } from './ClickAnalyticsChart';
import { ClickAnalyticsComparison } from './ClickAnalyticsComparison';
import { ClickAnalyticsText } from './ClickAnalyticsText';

interface ClickAnalyticsProps {
    data : FullAnalyticsData
    clicksLastWeekColor : string
    clicksCurrentWeekColor : string
    uniqueClicksLastWeekColor : string
    uniqueClicksCurrentWeekColor : string
}

export class ClickAnalytics extends React.Component<ClickAnalyticsProps> {

    render() {
        return <div className = "ClickAnalyticsBox">
            <div className = "ClickAnalyticsColumnBox">
                <ClickAnalyticsChart 
                lastWeekColor = {this.props.clicksLastWeekColor} 
                currentWeekColor = {this.props.clicksCurrentWeekColor} 
                data = {this.props.data}
                column = {0}
                />
                <ClickAnalyticsText
                lastWeekColor = {this.props.clicksLastWeekColor}
                currentWeekColor = {this.props.clicksCurrentWeekColor}
                data = {this.props.data}
                column = {0}
                />
            </div>
            <div className = "ClickAnalyticsColumnBox">
                <ClickAnalyticsComparison 
                data = {this.props.data}
                />
            </div>
            <div className = "ClickAnalyticsColumnBox">
                <ClickAnalyticsText
                lastWeekColor = {this.props.uniqueClicksLastWeekColor}
                currentWeekColor = {this.props.uniqueClicksCurrentWeekColor}
                data = {this.props.data}
                column = {1}
                />
                <ClickAnalyticsChart
                lastWeekColor = {this.props.uniqueClicksLastWeekColor}
                currentWeekColor = {this.props.uniqueClicksCurrentWeekColor}
                data = {this.props.data}
                column = {1}    
                />
            </div>
        </div>
    }

}