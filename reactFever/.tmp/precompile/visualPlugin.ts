import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var reactFever8DB75E0C310A44F3A27A95F33F89171E: IVisualPlugin = {
    name: 'reactFever8DB75E0C310A44F3A27A95F33F89171E',
    displayName: 'ReactFever',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["reactFever8DB75E0C310A44F3A27A95F33F89171E"] = reactFever8DB75E0C310A44F3A27A95F33F89171E;
}

export default reactFever8DB75E0C310A44F3A27A95F33F89171E;