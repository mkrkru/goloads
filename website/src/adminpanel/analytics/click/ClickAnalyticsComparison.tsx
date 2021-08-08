import React from 'react'
import { FullAnalyticsData } from '../../../back/AnalyticsData';

interface ClickAnalyticsComparisonProps {
    data : FullAnalyticsData
}

export class ClickAnalyticsComparison extends React.Component<ClickAnalyticsComparisonProps> {

    render() {
        var currentComparison = this.props.data.currentWeekClicks / this.props.data.currentWeekUniqueClicks
        var lastComparison = this.props.data.lastWeekClicks / this.props.data.lastWeekUniqueClicks
        return <div className = "ClickAnalyticsTextBox Center">
            <div className = "ClickAnalyticsAddInformation">
                {Math.floor(currentComparison * 100) / 100}    
            </div>
            <div>
                {currentComparison > lastComparison ? ">" : "<"}
                <div className = "ClickAnalyticsAddInformation">
                    {Math.floor(currentComparison / lastComparison * 100) / 100}
                </div>
            </div>
            <div className = "ClickAnalyticsAddInformation">
                {Math.floor(lastComparison * 100) / 100}    
            </div>  
        </div>
    }

}