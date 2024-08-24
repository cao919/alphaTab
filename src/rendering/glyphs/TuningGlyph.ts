import { MusicFontSymbol } from '@src/model/MusicFontSymbol';
import { Tuning } from '@src/model/Tuning';
import { ICanvas, TextAlign, TextBaseline } from '@src/platform/ICanvas';
import { GlyphGroup } from '@src/rendering/glyphs/GlyphGroup';
import { TextGlyph } from '@src/rendering/glyphs/TextGlyph';
import { MusicFontGlyph } from '@src/rendering/glyphs/MusicFontGlyph';

export class TuningGlyph extends GlyphGroup {
    private _tuning: Tuning;
    private _trackLabel: string;

    public constructor(x: number, y: number, tuning: Tuning, trackLabel: string) {
        super(x, y);
        this._tuning = tuning;
        this._trackLabel = trackLabel;
        this.glyphs = [];
    }

    public override doLayout() {
        if (this.glyphs!.length > 0) {
            return;
        }
        this.createGlyphs(this._tuning);
        for (const g of this.glyphs!) {
            g.renderer = this.renderer;
            g.doLayout();
        }
    }

    public override paint(cx: number, cy: number, canvas: ICanvas): void {
        canvas.textBaseline = TextBaseline.Middle;
        super.paint(cx, cy, canvas);
    }

    /**
     * The height of the GuitarString# glyphs at scale 1
     */
    public static readonly CircleNumberHeight: number = 20;
    public static readonly CircleNumberScale: number = 0.7;

    private createGlyphs(tuning: Tuning): void {
        const scale = this.renderer.scale;
        const res = this.renderer.resources;
        this.height = 0;

        const rowHeight = 15 * scale;

        // Track name
        if (this._trackLabel.length > 0) {
            const trackName = new TextGlyph(0, this.height, this._trackLabel, res.effectFont, TextAlign.Left);
            trackName.renderer = this.renderer;
            trackName.doLayout();
            this.height += trackName.height;
            trackName.y += trackName.height / 2;
            this.addGlyph(trackName);
        }

        // Name
        const tuningName = new TextGlyph(0, this.height, tuning.name, res.effectFont, TextAlign.Left);
        tuningName.renderer = this.renderer;
        tuningName.doLayout();
        this.height += tuningName.height;
        tuningName.y += tuningName.height / 2;
        this.addGlyph(tuningName);

        const stringColumnWidth = 64 * scale;

        this.renderer.scoreRenderer.canvas!.font = res.effectFont;
        this.width = Math.max(
            this.renderer.scoreRenderer.canvas!.measureText(this._trackLabel).width * scale,
            Math.max(this.renderer.scoreRenderer.canvas!.measureText(tuning.name).width * scale, 2 * stringColumnWidth)
        );

        if (!tuning.isStandard) {
            this.height += rowHeight;
            const circleScale = TuningGlyph.CircleNumberScale;
            const circleHeight = TuningGlyph.CircleNumberHeight * circleScale * scale;

            // Strings
            let stringsPerColumn: number = Math.ceil(tuning.tunings.length / 2.0) | 0;
            let currentX: number = 0;
            let currentY: number = this.height;
            for (let i: number = 0, j: number = tuning.tunings.length; i < j; i++) {
                const symbol = ((MusicFontSymbol.GuitarString0 as number) + (i + 1)) as MusicFontSymbol;
                this.addGlyph(new MusicFontGlyph(currentX, currentY + circleHeight / 2.5, circleScale, symbol));

                const str: string = '= ' + Tuning.getTextForTuning(tuning.tunings[i], false);
                this.addGlyph(
                    new TextGlyph(currentX + circleHeight + 1 * scale, currentY, str, res.effectFont, TextAlign.Left)
                );
                currentY += rowHeight;
                if (i === stringsPerColumn - 1) {
                    currentY = this.height;
                    currentX += stringColumnWidth;
                }
            }
            this.height += stringsPerColumn * rowHeight;
        }

        this.width += 15 * scale;
    }
}
