// <auto-generated>
// This code was auto-generated.
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>
import { FontJson } from "@src/model/Font";
import { ColorJson } from "@src/model/Color";
/**
 * This public class contains central definitions for controlling the visual appearance.
 * @json
 * @json_declaration
 * @target web
 */
export interface RenderingResourcesJson {
    /**
     * Gets or sets the font to use for displaying the songs copyright information in the header of the music sheet.
     */
    copyrightFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the songs title in the header of the music sheet.
     */
    titleFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the songs subtitle in the header of the music sheet.
     */
    subTitleFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the lyrics information in the header of the music sheet.
     */
    wordsFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying certain effect related elements in the music sheet.
     */
    effectFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the fretboard numbers in chord diagrams.
     */
    fretboardNumberFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the numbered music notation in the music sheet.
     */
    numberedNotationFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the grace notes in numbered music notation in the music sheet.
     */
    numberedNotationGraceFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying the guitar tablature numbers in the music sheet.
     */
    tablatureFont?: FontJson;
    /**
     * Gets or sets the font to use for grace notation related texts in the music sheet.
     */
    graceFont?: FontJson;
    /**
     * Gets or sets the color to use for rendering the lines of staves.
     */
    staffLineColor?: ColorJson;
    /**
     * Gets or sets the color to use for rendering bar separators, the accolade and repeat signs.
     */
    barSeparatorColor?: ColorJson;
    /**
     * Gets or sets the font to use for displaying the bar numbers above the music sheet.
     */
    barNumberFont?: FontJson;
    /**
     * Gets or sets the color to use for displaying the bar numbers above the music sheet.
     */
    barNumberColor?: ColorJson;
    /**
     * Gets or sets the font to use for displaying finger information above the music sheet.
     */
    fingeringFont?: FontJson;
    /**
     * Gets or sets the font to use for displaying finger information when inline into the music sheet.
     */
    inlineFingeringFont?: FontJson;
    /**
     * Gets or sets the font to use for section marker labels shown above the music sheet.
     */
    markerFont?: FontJson;
    /**
     * Gets or sets the color to use for music notation elements of the primary voice.
     */
    mainGlyphColor?: ColorJson;
    /**
     * Gets or sets the color to use for music notation elements of the secondary voices.
     */
    secondaryGlyphColor?: ColorJson;
    /**
     * Gets or sets the color to use for displaying the song information above the music sheet.
     */
    scoreInfoColor?: ColorJson;
}
