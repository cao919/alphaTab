// <auto-generated>
// This code was auto-generated.
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>
import { RenderStylesheet } from "@src/model/RenderStylesheet";
import { JsonHelper } from "@src/io/JsonHelper";
import { BracketExtendMode } from "@src/model/RenderStylesheet";
export class RenderStylesheetSerializer {
    public static fromJson(obj: RenderStylesheet, m: unknown): void {
        if (!m) {
            return;
        }
        JsonHelper.forEach(m, (v, k) => this.setProperty(obj, k, v));
    }
    public static toJson(obj: RenderStylesheet | null): Map<string, unknown> | null {
        if (!obj) {
            return null;
        }
        const o = new Map<string, unknown>();
        o.set("hidedynamics", obj.hideDynamics);
        o.set("bracketextendmode", obj.bracketExtendMode as number);
        o.set("usesystemsignseparator", obj.useSystemSignSeparator);
        return o;
    }
    public static setProperty(obj: RenderStylesheet, property: string, v: unknown): boolean {
        switch (property) {
            case "hidedynamics":
                obj.hideDynamics = v! as boolean;
                return true;
            case "bracketextendmode":
                obj.bracketExtendMode = JsonHelper.parseEnum<BracketExtendMode>(v, BracketExtendMode)!;
                return true;
            case "usesystemsignseparator":
                obj.useSystemSignSeparator = v! as boolean;
                return true;
        }
        return false;
    }
}
