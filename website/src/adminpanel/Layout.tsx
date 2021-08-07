import React from "react";
import './Layout.css';

export interface AdminPanelBarComponent {
    render: () => JSX.Element
    icon: () => JSX.Element
}

interface AdminPanelLayoutProps {
    barComponents: AdminPanelBarComponent[]
}

interface AdminPanelLayoutState {
    current: number
}

export class AdminPanelLayout extends React.Component<AdminPanelLayoutProps, AdminPanelLayoutState> {

    constructor(props: AdminPanelLayoutProps) {
        super(props)
        this.state = {
            current: 0
        }
    }

    render() {
        return <div className="AdminLayout">
            <div className="AdminLayoutLeftBar">
                <div className="AdminLayoutLeftBarMargin"/>
                {
                    this.props.barComponents.map((component, index, _) => {
                        return <div className="AdminLayoutButton" onClick={
                            () => this.setState((__, ___) => { return { current: index } })
                        }>
                            {component.icon()}
                        </div>
                    })
                }
            </div>
            <div className="AdminLayoutBody">
                {
                    this.props.barComponents[this.state.current].render()
                }
            </div>
        </div>
    }

}