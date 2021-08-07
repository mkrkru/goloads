import React from 'react';
import Chart from 'react-google-charts';
import '../../../common/Common.css';

interface AnalyticsChartProps {
    /**
     * 1 element - current week,
     * 2 element - last week
     * 
     * example : 
     * [0, 2], - 1 day
     * [1, 3], - 2 day
     * [3, 2], - 3 day
     * [4, 5], - 4 day
     * [6, 8], - 5 day
     * [9, 0], - 6 day
     * [3, 2], - 7 day
     */
    data : number[][],
    lastWeekColor : string,
    currentWeekColor : string
}

export class ClickAnalyticsChart extends React.Component<AnalyticsChartProps> {

    render() {
        return <Chart
            width = "700px"
            height = "250px"
            chartType = "AreaChart"
            loader = {<div className="Center">Loading click stats...</div>}
            data = {[
                ['Day', 'Current', 'Last'],
                ...this.props.data.map((value, index, _) => [index + 1, value[0], value[1]])
            ]}
            options = {{
                colors : [
                    this.props.currentWeekColor,
                    this.props.lastWeekColor,
                ],
                title : 'Click stats',
                hAxis : { 
                    title : 'Week',
                    titleTextStyle : {
                        color : '#333'
                    }
                },
                vAxis : {
                    title : "Clicks",
                    titleTextStyle : {
                        color : '#333'
                    }
                },
                chartArea : { width: '60%', height: '80%'}
            }}
        />
    }

}