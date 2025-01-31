import { GeneralMidi } from '@src/midi/GeneralMidi';
import { Beat } from '@src/model/Beat';
import { Duration } from '@src/model/Duration';
import { Fingers } from '@src/model/Fingers';
import { Score } from '@src/model/Score';
import { FingeringMode } from '@src/NotationSettings';
import { Settings } from '@src/Settings';
import { NoteAccidentalMode } from './NoteAccidentalMode';

export class TuningParseResult {
    public note: string | null = null;
    public tone: TuningParseResultTone = new TuningParseResultTone();
    public octave: number = 0;

    public get realValue(): number {
        return this.octave * 12 + this.tone.noteValue;
    }
}

export class TuningParseResultTone {
    public noteValue: number;
    public accidentalMode: NoteAccidentalMode;
    public constructor(noteValue: number = 0, accidentalMode: NoteAccidentalMode = NoteAccidentalMode.Default) {
        this.noteValue = noteValue;
        this.accidentalMode = accidentalMode;
    }
}

/**
 * This public class contains some utilities for working with model public classes
 */
export class ModelUtils {
    public static getIndex(duration: Duration): number {
        let index: number = 0;
        let value: number = duration;
        if (value < 0) {
            return index;
        }
        return Math.log2(duration) | 0;
    }

    public static keySignatureIsFlat(ks: number): boolean {
        return ks < 0;
    }

    public static keySignatureIsNatural(ks: number): boolean {
        return ks === 0;
    }

    public static keySignatureIsSharp(ks: number): boolean {
        return ks > 0;
    }

    public static applyPitchOffsets(settings: Settings, score: Score): void {
        for (let i: number = 0; i < score.tracks.length; i++) {
            if (i < settings.notation.displayTranspositionPitches.length) {
                for (let staff of score.tracks[i].staves) {
                    staff.displayTranspositionPitch = -settings.notation.displayTranspositionPitches[i];
                }
            }
            if (i < settings.notation.transpositionPitches.length) {
                for (let staff of score.tracks[i].staves) {
                    staff.transpositionPitch = -settings.notation.transpositionPitches[i];
                }
            }
        }
    }

    public static fingerToString(settings: Settings, beat: Beat, finger: Fingers, leftHand: boolean): string | null {
        if (
            settings.notation.fingeringMode === FingeringMode.ScoreForcePiano ||
            settings.notation.fingeringMode === FingeringMode.SingleNoteEffectBandForcePiano ||
            GeneralMidi.isPiano(beat.voice.bar.staff.track.playbackInfo.program)
        ) {
            switch (finger) {
                case Fingers.Unknown:
                case Fingers.NoOrDead:
                    return null;
                case Fingers.Thumb:
                    return '1';
                case Fingers.IndexFinger:
                    return '2';
                case Fingers.MiddleFinger:
                    return '3';
                case Fingers.AnnularFinger:
                    return '4';
                case Fingers.LittleFinger:
                    return '5';
                default:
                    return null;
            }
        }
        if (leftHand) {
            switch (finger) {
                case Fingers.Unknown:
                    return null;
                case Fingers.NoOrDead:
                    return '0';
                case Fingers.Thumb:
                    return 't';
                case Fingers.IndexFinger:
                    return '1';
                case Fingers.MiddleFinger:
                    return '2';
                case Fingers.AnnularFinger:
                    return '3';
                case Fingers.LittleFinger:
                    return '4';
                default:
                    return null;
            }
        }
        switch (finger) {
            case Fingers.Unknown:
            case Fingers.NoOrDead:
                return null;
            case Fingers.Thumb:
                return 'p';
            case Fingers.IndexFinger:
                return 'i';
            case Fingers.MiddleFinger:
                return 'm';
            case Fingers.AnnularFinger:
                return 'a';
            case Fingers.LittleFinger:
                return 'c';
            default:
                return null;
        }
    }

    /**
     * Checks if the given string is a tuning inticator.
     * @param name
     */
    public static isTuning(name: string): boolean {
        return !!ModelUtils.parseTuning(name);
    }

    public static parseTuning(name: string): TuningParseResult | null {
        let note: string = '';
        let octave: string = '';
        for (let i: number = 0; i < name.length; i++) {
            let c: number = name.charCodeAt(i);
            if (c >= 0x30 && c <= 0x39 /* 0-9 */) {
                // number without note?
                if (!note) {
                    return null;
                }
                octave += String.fromCharCode(c);
            } else if ((c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || c === 0x23) {
                /* A-Za-Z# */ note += String.fromCharCode(c);
            } else {
                return null;
            }
        }
        if (!octave || !note) {
            return null;
        }
        let result: TuningParseResult = new TuningParseResult();

        result.octave = parseInt(octave) + 1;
        result.note = note.toLowerCase();
        result.tone = ModelUtils.getToneForText(result.note);

        // if tone.noteValue is negative (eg. on Cb note)
        // we adjust roll-over to a lower octave
        if (result.tone.noteValue < 0) {
            result.octave--;
            result.tone.noteValue += 12;
        }

        return result;
    }

    public static getTuningForText(str: string): number {
        let result: TuningParseResult | null = ModelUtils.parseTuning(str);
        if (!result) {
            return -1;
        }
        return result.realValue;
    }

    public static getToneForText(note: string): TuningParseResultTone {
        const noteName = note.substring(0, 1);
        const accidental = note.substring(1);

        let noteValue: number;
        let noteAccidenalMode: NoteAccidentalMode;

        switch (noteName.toLowerCase()) {
            case 'c':
                noteValue = 0;
                break;
            case 'd':
                noteValue = 2;
                break;
            case 'e':
                noteValue = 4;
                break;
            case 'f':
                noteValue = 5;
                break;
            case 'g':
                noteValue = 7;
                break;
            case 'a':
                noteValue = 9;
                break;
            case 'b':
                noteValue = 11;
                break;
            default:
                noteValue = 0;
                break;
        }

        noteAccidenalMode = ModelUtils.parseAccidentalMode(accidental);
        switch (noteAccidenalMode) {
            case NoteAccidentalMode.Default:
                break;
            case NoteAccidentalMode.ForceNone:
                break;
            case NoteAccidentalMode.ForceNatural:
                break;
            case NoteAccidentalMode.ForceSharp:
                noteValue++;
                break;
            case NoteAccidentalMode.ForceDoubleSharp:
                noteValue += 2;
                break;
            case NoteAccidentalMode.ForceFlat:
                noteValue--;
                break;
            case NoteAccidentalMode.ForceDoubleFlat:
                noteValue -= 2;
                break;
        }

        return new TuningParseResultTone(noteValue, noteAccidenalMode);
    }

    /**
     * @internal
     */
    public static readonly accidentalModeMapping = new Map<string, NoteAccidentalMode>([
        ['default', NoteAccidentalMode.Default],
        ['d', NoteAccidentalMode.Default],

        ['forcenone', NoteAccidentalMode.ForceNone],
        ['-', NoteAccidentalMode.ForceNone],

        ['forcenatural', NoteAccidentalMode.ForceNatural],
        ['n', NoteAccidentalMode.ForceNatural],

        ['forcesharp', NoteAccidentalMode.ForceSharp],
        ['#', NoteAccidentalMode.ForceSharp],

        ['forcedoublesharp', NoteAccidentalMode.ForceDoubleSharp],
        ['##', NoteAccidentalMode.ForceDoubleSharp],
        ['x', NoteAccidentalMode.ForceDoubleSharp],

        ['forceflat', NoteAccidentalMode.ForceFlat],
        ['b', NoteAccidentalMode.ForceFlat],

        ['forcedoubleflat', NoteAccidentalMode.ForceDoubleFlat],
        ['bb', NoteAccidentalMode.ForceDoubleFlat]
    ]);

    public static parseAccidentalMode(data: string): NoteAccidentalMode {
        const key = data.toLowerCase();
        if (ModelUtils.accidentalModeMapping.has(key)) {
            return ModelUtils.accidentalModeMapping.get(key)!;
        }
        return NoteAccidentalMode.Default;
    }

    public static newGuid(): string {
        return (
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            '-' +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            '-' +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            '-' +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            '-' +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1) +
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        );
    }

    public static isAlmostEqualTo(a: number, b: number): boolean {
        return Math.abs(a - b) < 0.00001;
    }

    public static toHexString(n: number, digits: number = 0): string {
        let s: string = '';
        let hexChars: string = '0123456789ABCDEF';
        do {
            s = String.fromCharCode(hexChars.charCodeAt(n & 15)) + s;
            n = n >> 4;
        } while (n > 0);
        while (s.length < digits) {
            s = '0' + s;
        }
        return s;
    }
}
