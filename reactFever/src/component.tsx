import * as React from "react";
import { scaleLinear } from "d3";
import powerbi from "powerbi-visuals-api";
import DataViewTable = powerbi.DataViewTable;

export interface padding{
  paddingLeft: Number,
  paddingTop: Number,
  paddingRight: Number,
  paddingBottom: Number
}

export interface State {
  activities: DataViewTable,
  width: number,
  height: number
}

export const initialState: State = {
  activities: null,
  width: 200,
  height: 200
}

export class ReactFever extends React.Component<{},State>{
  constructor(props: any){
    super(props);
    this.state = initialState;
  }

  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
      if(typeof ReactFever.updateCallback === 'function'){
          ReactFever.updateCallback(newState);
      }
  }

  public state: State = initialState;

  public componentWillMount() {
      ReactFever.updateCallback = (newState: State): void => { this.setState(newState); };
  }

  public componentWillUnmount() {
      ReactFever.updateCallback = null;
  }
  
  render(){
        const padding= {
          paddingLeft: 10,
          paddingRight: 40,
          paddingTop: 15,
          paddingBottom: 30}
        const xLineOffSet = 20
        const yLineOffSet = 0
        let {activities,width,height} =this.state;
        
        const xScale = scaleLinear()
          .domain([0, 100])
          .range([0+padding.paddingLeft, width-padding.paddingRight]);
        const yScale = scaleLinear()
        .domain([0, 100])
        .range([0+padding.paddingTop, height-padding.paddingBottom]);
        const [xStart, xEnd] = xScale.range();
        const [yStart, yEnd] = yScale.range();
        const ticks = xScale.ticks();

        const drawableWidth = xEnd - xStart - xLineOffSet  
        const drawableHeight = yEnd - yStart - yLineOffSet  

        const gPoints = `${xStart+xLineOffSet},${yEnd+yLineOffSet} ${xEnd+xLineOffSet},${yEnd+yLineOffSet} ${xEnd+xLineOffSet},${yStart+0.2*drawableHeight+yLineOffSet}`
        const yPoints = `${xStart+xLineOffSet},${yEnd+yLineOffSet} ${xEnd+xLineOffSet},${yStart+0.2*drawableHeight+yLineOffSet} ${xEnd+xLineOffSet},${yStart+yLineOffSet}`
        const rPoints = `${xStart+xLineOffSet},${yEnd+yLineOffSet} ${xEnd+xLineOffSet},${yStart+yLineOffSet} ${xStart+xLineOffSet},${yStart+yLineOffSet}`
        
        return (
            <div className="feverChart">
                <svg width={width} height={height}>
                    <polygon points={gPoints} fill="green" fillOpacity="0.3"/>
                    <polygon points={yPoints} fill="yellow" fillOpacity="0.3"/>
                    <polygon points={rPoints} fill="red" fillOpacity="0.3"/>
                    <line x1={xStart+xLineOffSet} x2={xEnd+xLineOffSet} y1={yEnd+yLineOffSet} y2={yEnd+yLineOffSet} stroke="gray" />
                    <g className="ticks">
                        {ticks.map((t, i) => {
                          const x = xScale(t);
                          return (
                            <React.Fragment key={i}>
                                <line x1={x+xLineOffSet} x2={x+xLineOffSet} y1={yEnd+yLineOffSet} y2={yEnd+5+yLineOffSet} stroke="gray" />
                                <text
                                  x={x+xLineOffSet}
                                  y={yEnd + 20+yLineOffSet}
                                  fill="gray"
                                  textAnchor="middle"
                                  fontSize={10}
                                >
                                  {t}%
                                </text>
                            </React.Fragment>
                          );
                        })}
                    </g>
                    <line x1={xStart+xLineOffSet} x2={xStart+xLineOffSet} y1={yEnd+yLineOffSet} y2={yStart+yLineOffSet} stroke="gray" />
                    <g className="ticks">
                        {ticks.map((t, i) => {
                          const y = yScale(t);
                          return (
                            <React.Fragment key={i}>
                                <line y1={y+yLineOffSet} y2={y+yLineOffSet} x1={xStart-5+xLineOffSet} x2={xStart+xLineOffSet} stroke="gray" />
                                <text
                                  x={xStart-20+xLineOffSet}
                                  y={y+5+yLineOffSet}
                                  fill="gray"
                                  textAnchor="middle"
                                  fontSize={10}
                                >
                                  {100-t}%
                                </text>
                            </React.Fragment>
                          );
                        })}
                    </g>
                    <g className="markers">
                      {(function(dados: DataViewTable){
                          if(dados === null){
                            const centerX = 0.5*(xEnd-xStart)+xStart+xLineOffSet;
                            const centerY = yEnd -0.5*(yEnd - yStart)+yLineOffSet;
                            return (
                              <React.Fragment>
                              <text x={centerX}
                                    y={centerY}    
                                    fill="Black"
                                    textAnchor="middle"
                                    fontSize={30}>No Data</text>
                              </React.Fragment>
                            );
                          }else{
                            return (
                              dados.rows.filter((row) => {
                              if(row==null){return false;}
                              
                              if(row[0]==null){return false;}
                              let valx = row[0].valueOf();
                              if (typeof valx !='number'){return false;}
                              
                              if(row[1]==null){return false;}
                              let valy = row[1].valueOf();
                              if (typeof valy !='number'){return false;}
                              
                              return true;
                              }).map((row,i)=>{
                                let valx = row[0].valueOf();
                                let xval : number = Number(valx);
                              
                                let valy = row[1].valueOf();
                                let yval : number = Number(valy);
                              
                                const posX = xval*(xEnd-xStart)+xStart+xLineOffSet;
                                const posY = yEnd -yval*(yEnd - yStart)+yLineOffSet;
                                return (
                                  <React.Fragment>
                                  <circle cx={posX} cy={posY} r="8" fill="blue" stroke="white" stroke-width="3"/>
                                  </React.Fragment>
                                );
                              })
                            );
                          }
                      })(activities)}
                    </g>
                </svg>
            </div>
        )
  }
}

export default ReactFever;