import React from 'react';
import { AdminPanelBarComponent } from '../Layout';
import { AnalyticsChart } from './AnalyticsChart';

export class AnalyticsComponent extends React.Component implements AdminPanelBarComponent {
    
    icon() {
        return <div></div>
    }

    render() {
        return <div>
            <AnalyticsChart data = {[
                [0, 0],
                [1, 2],
                [1, 3],
                [4, 4]
            ]}/>
        </div>
    }
}