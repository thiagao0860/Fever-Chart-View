"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any,any, any>;

export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private green_area: Selection<SVGElement>;
    private yellow_area: Selection<SVGElement>;
    private red_area: Selection<SVGElement>;
    private vector: Array<Selection<SVGElement>>;

    constructor(options: VisualConstructorOptions) {
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('circleCard', true);
        this.container = this.svg.append("g")
            .classed('container', true);
        this.green_area = this.container.append("polygon")
            .classed('polygon1', true);
        this.yellow_area = this.container.append("polygon")
            .classed('polygon2', true);
        this.red_area = this.container.append("polygon")
            .classed('poligon3', true);
        this.vector = [];
    }

    public update(options: VisualUpdateOptions) {
        const dataView: DataView = options.dataViews[0];
        const tableDataView: DataViewTable = dataView.table;
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        this.green_area
            .style("fill", "green")
            .style("fill-opacity", 0.4)
            .attr("points",`0 ${height},${width} ${height},${width} ${0.2*height}`);
        this.yellow_area
            .style("fill", "yellow")
            .style("fill-opacity", 0.4)
            .attr("points",`0 ${height},${width} ${0.2*height},${width} 0`);
        this.red_area
            .style("fill", "red")
            .style("fill-opacity", 0.4)
            .attr("points",`0 ${height},${width} 0, 0 0`);
        this.vector.forEach((element: Selection<SVGElement>)=>{
            element.remove();
        });
        this.vector = [];
        
        if (!tableDataView) {
                return;
        }
            
        tableDataView.rows.forEach((row: DataViewTableRow) => {
            if(row==null){return;}

            if(row[0]==null){return;}
            let valx = row[0].valueOf();
            if (typeof valx !='number'){return;}
            let xval : number = Number(valx);
            
            if(row[1]==null){return;}
            let valy = row[1].valueOf();
            if (typeof valy !='number'){return;}
            let yval : number = Number(valy);

            let cir: Selection<SVGElement> = this.container.append("circle");
            cir
            .style("fill", "blue")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .attr("r", 10)
            .attr("cx", xval*width)
            .attr("cy", yval*height);
            this.vector.unshift(cir);
            
        });

    }

}