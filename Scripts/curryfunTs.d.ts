/// <reference path="typings/node/node.d.ts" />
declare const where: (p: (a: any) => boolean) => (itr: any) => any[];
declare const map: (f: (a: any) => any) => (itr: any) => any[];
export { map, where };
