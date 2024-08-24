// <auto-generated>
// This code was auto-generated.
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>
import { RenderingResources } from "@src/RenderingResources";
import { JsonHelper } from "@src/io/JsonHelper";
import { Font } from "@src/model/Font";
import { Color } from "@src/model/Color";
export class RenderingResourcesSerializer {
    public static fromJson(obj: RenderingResources, m: unknown): void {
        if (!m) {
            return;
        }
        JsonHelper.forEach(m, (v, k) => this.setProperty(obj, k.toLowerCase(), v));
    }
    public static toJson(obj: RenderingResources | null): Map<string, unknown> | null {
        if (!obj) {
            return null;
        }
        const o = new Map<string, unknown>();
        o.set("copyrightfont", Font.toJson(obj.copyrightFont));
        o.set("titlefont", Font.toJson(obj.titleFont));
        o.set("subtitlefont", Font.toJson(obj.subTitleFont));
        o.set("wordsfont", Font.toJson(obj.wordsFont));
        o.set("effectfont", Font.toJson(obj.effectFont));
        o.set("fretboardnumberfont", Font.toJson(obj.fretboardNumberFont));
        o.set("numberednotationfont", Font.toJson(obj.numberedNotationFont));
        o.set("numberednotationgracefont", Font.toJson(obj.numberedNotationGraceFont));
        o.set("tablaturefont", Font.toJson(obj.tablatureFont));
        o.set("gracefont", Font.toJson(obj.graceFont));
        o.set("stafflinecolor", Color.toJson(obj.staffLineColor));
        o.set("barseparatorcolor", Color.toJson(obj.barSeparatorColor));
        o.set("barnumberfont", Font.toJson(obj.barNumberFont));
        o.set("barnumbercolor", Color.toJson(obj.barNumberColor));
        o.set("fingeringfont", Font.toJson(obj.fingeringFont));
        o.set("markerfont", Font.toJson(obj.markerFont));
        o.set("mainglyphcolor", Color.toJson(obj.mainGlyphColor));
        o.set("secondaryglyphcolor", Color.toJson(obj.secondaryGlyphColor));
        o.set("scoreinfocolor", Color.toJson(obj.scoreInfoColor));
        return o;
    }
    public static setProperty(obj: RenderingResources, property: string, v: unknown): boolean {
        switch (property) {
            case "copyrightfont":
                obj.copyrightFont = Font.fromJson(v)!;
                return true;
            case "titlefont":
                obj.titleFont = Font.fromJson(v)!;
                return true;
            case "subtitlefont":
                obj.subTitleFont = Font.fromJson(v)!;
                return true;
            case "wordsfont":
                obj.wordsFont = Font.fromJson(v)!;
                return true;
            case "effectfont":
                obj.effectFont = Font.fromJson(v)!;
                return true;
            case "fretboardnumberfont":
                obj.fretboardNumberFont = Font.fromJson(v)!;
                return true;
            case "numberednotationfont":
                obj.numberedNotationFont = Font.fromJson(v)!;
                return true;
            case "numberednotationgracefont":
                obj.numberedNotationGraceFont = Font.fromJson(v)!;
                return true;
            case "tablaturefont":
                obj.tablatureFont = Font.fromJson(v)!;
                return true;
            case "gracefont":
                obj.graceFont = Font.fromJson(v)!;
                return true;
            case "stafflinecolor":
                obj.staffLineColor = Color.fromJson(v)!;
                return true;
            case "barseparatorcolor":
                obj.barSeparatorColor = Color.fromJson(v)!;
                return true;
            case "barnumberfont":
                obj.barNumberFont = Font.fromJson(v)!;
                return true;
            case "barnumbercolor":
                obj.barNumberColor = Color.fromJson(v)!;
                return true;
            case "fingeringfont":
                obj.fingeringFont = Font.fromJson(v)!;
                return true;
            case "markerfont":
                obj.markerFont = Font.fromJson(v)!;
                return true;
            case "mainglyphcolor":
                obj.mainGlyphColor = Color.fromJson(v)!;
                return true;
            case "secondaryglyphcolor":
                obj.secondaryGlyphColor = Color.fromJson(v)!;
                return true;
            case "scoreinfocolor":
                obj.scoreInfoColor = Color.fromJson(v)!;
                return true;
        }
        return false;
    }
}
