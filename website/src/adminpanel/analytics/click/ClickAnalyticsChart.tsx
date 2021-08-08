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
    data: number[][],
    lastWeekColor: string,
    currentWeekColor: string
}

const width = 700
const height = 250
const format = "px"

export class ClickAnalyticsChart extends React.Component<AnalyticsChartProps> {

    render() {
        return <Chart
            width={width + format}
            height={height + format}
            chartType="AreaChart"
            loader={
                <div 
                className="Center" 
                style = {{
                    width : (width - 10) + format,
                    height : (height - 9) + format,
                    padding: 4 + format,
                    border : `1${format} solid black`,
                    borderTop : "0px solid black"
                }}
                >
                    Loading click stats...
                </div>
            }
            data={[
                ['Day', 'Current', 'Last'],
                ...this.props.data.map((value, index, _) => [index + 1, value[0], value[1]])
            ]}
            options={{
                colors: [
                    this.props.currentWeekColor,
                    this.props.lastWeekColor,
                ],
                title: 'Click stats',
                hAxis: {
                    title: 'Week',
                    titleTextStyle: {
                        color: '#333'
                    }
                },
                vAxis: {
                    title: "Clicks",
                    titleTextStyle: {
                        color: '#333'
                    }
                },
                chartArea: { width: '60%', height: '80%' }
            }}
        />
    }

}