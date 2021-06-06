import * as React from "react";
import powerbi from "powerbi-visuals-api";
import DataViewTable = powerbi.DataViewTable;
export interface padding {
    paddingLeft: Number;
    paddingTop: Number;
    paddingRight: Number;
    paddingBottom: Number;
}
export interface State {
    activities: DataViewTable;
    width: number;
    height: number;
}
export declare const initialState: State;
export declare class ReactFever extends React.Component<{}, State> {
    constructor(props: any);
    private static updateCallback;
    static update(newState: State): void;
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ReactFever;
