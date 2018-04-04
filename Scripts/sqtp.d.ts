export interface erItm {
    ix: n;
    sfxMsg: s[];
    endMsg: s[];
}
export declare type sqtp = s;
export interface posLin {
    pos: n;
    lin: s;
}
export interface posWdt {
    pos: n;
    wdt: n;
}
export declare const sqtpRslt: (_sqtp: string) => {
    vtp: string;
    sql: string;
};
export declare const dic_dftVal: <T>(dft: T) => (dic: Map<string, T>, key: string) => T;
export declare const lin_termAy: (_lin: string) => string[];
export declare const lin_fmT3DupTermSet: (_lin: string) => Set<string>;
export declare const lin_termPosWdtAy: (a: string) => posWdt[];
export declare const lin_t2PosWdt: (a: string) => posWdt | null;
export declare const lin_AddMrk: (a: string, pos: number, len: number) => string;
export declare const lin_fmT3DupTermMrkrLin: (a: string) => string;
export declare const ly_sdic: (a: string[]) => Map<string, string>;
export declare const ly_fstTermAy: (ly: string[]) => string[];
export declare const ly_fstTermDupSet: (ly: string[]) => Set<string>;
export declare const posLin_ParseSpc: ({ pos, lin }: posLin) => posLin;
export declare const posLin_ParseTerm: ({ pos, lin }: posLin) => [string, posLin];
export declare const lin_t1MrkrLin: (a: string, msg: string) => string;
export declare const lin_t2MrkrLin: (a: string, msg: string) => string;
