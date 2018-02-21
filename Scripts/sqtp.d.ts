/// <reference path="curryfun.d.ts" />
import { n, s } from './curryfun';
export interface ErItm {
    ix: n;
    sfxMsg: s[];
    endMsg: s[];
}
export declare type Er = ErItm[];
export declare const sqtprslt: (sqtp: any) => {
    vtp: string[];
    sql: any;
};
