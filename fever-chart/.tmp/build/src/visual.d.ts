import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private host;
    private svg;
    private container;
    private green_area;
    private yellow_area;
    private red_area;
    private vector;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
}
