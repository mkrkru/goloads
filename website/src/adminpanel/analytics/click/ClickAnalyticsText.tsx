import React from 'react';
import { dataById, FullAnalyticsData } from '../../../back/AnalyticsData';

interface ClickAnalyticsTextProps {
    data : FullAnalyticsData,
    currentWeekColor : string,
    lastWeekColor : string,
    column : number
}

export class ClickAnalyticsText extends React.Component<ClickAnalyticsTextProps> {
    
    render() {
        var currentColumn = dataById(this.props.column, this.props.data)
        return <div className = "ClickAnalyticsTextBox Center">
            <div style={{
                color : this.props.currentWeekColor
            }}>
                {currentColumn.current}
            </div>
            <div style={{
                color : currentColumn.current > currentColumn.last ? this.props.currentWeekColor : this.props.lastWeekColor 
            }}>
                {currentColumn.current > currentColumn.last ? ">" : "<"}
                <div className = "ClickAnalyticsAddInformation">
                    {Math.floor(currentColumn.current / currentColumn.last * 100) / 100}
                </div>
            </div>
            <div style={{
                color : this.props.lastWeekColor
            }}>
                {currentColumn.last}
            </div>
        </div>
    }

}