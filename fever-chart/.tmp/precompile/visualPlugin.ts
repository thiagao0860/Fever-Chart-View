import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var scatter6A7202C517A24F309B46F82631B8BA05: IVisualPlugin = {
    name: 'scatter6A7202C517A24F309B46F82631B8BA05',
    displayName: 'Fever View',
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
    powerbi.visuals.plugins["scatter6A7202C517A24F309B46F82631B8BA05"] = scatter6A7202C517A24F309B46F82631B8BA05;
}

export default scatter6A7202C517A24F309B46F82631B8BA05;