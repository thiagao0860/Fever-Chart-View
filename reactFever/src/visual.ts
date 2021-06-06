"use strict";
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;

// Import React dependencies and the added component
import * as React from "react";
import * as ReactDOM from "react-dom";
import {ReactFever,initialState} from "./component";

import "./../style/visual.less";

export class Visual implements IVisual {

    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(ReactFever, {});
        this.target = options.element;
    
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        if(options.dataViews && options.dataViews[0]){
            const dataView: DataView = options.dataViews[0];
            const iViewport = options.viewport;
            const {width, height} = iViewport;

            ReactFever.update({
                activities: dataView.table,
                width: width,
                height: height
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactFever.update(initialState);
    }
}