import React from 'react';

interface ClickAnalyticsTextProps {
    data : number[][],
    currentWeekColor : string,
    lastWeekColor : string
}

export class ClickAnalyticsText extends React.Component<ClickAnalyticsTextProps> {
    
    render() {
        var lastWeek = 0;
        var currentWeek = 0;
        this.props.data.forEach((array, _, __) => {
            currentWeek += array[0]
            lastWeek += array[1]
        })
        return <div className = "ClickAnalyticsTextBox Center">
            <div style={{
                color : this.props.currentWeekColor
            }}>
                {currentWeek}
            </div>
            <div style={{
                color : currentWeek > lastWeek ? this.props.currentWeekColor : this.props.lastWeekColor 
            }}>
                {currentWeek > lastWeek ? ">" : "<"}
                <div className = "ClickAnalyticsAddInformation">
                    {Math.floor(currentWeek / lastWeek * 100) / 100}
                </div>
            </div>
            <div style={{
                color : this.props.lastWeekColor
            }}>
                {lastWeek}
            </div>
        </div>
    }

}