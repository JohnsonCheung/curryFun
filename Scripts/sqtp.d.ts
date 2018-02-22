/// <reference path="curryfun.d.ts" />
import { n, s } from './curryfun';
export interface ErItm {
    ix: n;
    sfxMsg: s[];
    endMsg: s[];
}
export interface termPos {
    pos: n;
    len: n;
}
export declare type Er = ErItm[];
export { sqtprslt };
declare const sqtprslt: (a: string) => {
    vtp: string;
    sql: string;
};
export declare const _termPosAyRmkLin: (a: termPos[]) => string;
