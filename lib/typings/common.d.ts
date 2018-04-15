interface drs { dry: dry; fny: fny }
interface p123 { p1: s, p2: s, p3: s }
interface s1s2 { s1: s, s2: s }
interface tf<T> { t: T[], f: T[] }
interface linShift { term: s, remainLin: s }
interface quote { q1: s, q2: s }
declare type tfPair<V> = { t: V, f: V }
declare type s = string
declare type key = s
declare type n = number
declare type match = RegExpMatchArray
declare type kv = [s, s]
declare type vid = s // vid = value-id
declare type sid = s // sid = string-id
declare type lin = s
declare type pair<T> = [T, T]
declare type strPair = pair<s>
declare type re = RegExp
declare type ft = s
declare type fts = ft
declare type fjs = ft
declare type fTstJs = ft
declare type fTstTs = ft
declare type fn = s
declare type ffn = string
declare type b = boolean
declare type dr = ay
declare type lines = s
declare type o = object
declare type quoteStr = s
declare type k = s
declare type pfx = s
declare type nm = s
declare type ny = nm[] 
declare type ssv = s
declare type nmStr = ssv
declare type nyPrm = ny | nmStr
declare type wdt = n
declare type cml = s
declare type cnt = n
declare type ix = n
declare type pth = s
declare type seg = s
declare type cummulator<T> = (cum: T) => (itm) => T
declare type pred<T> = (a: T) => b
declare type opt<T> = T | null
declare type fun<T> = (x: T) => any
declare type Itr<T> = Iterable<T>
declare type map = Map<any, any>
declare type dry = Array<dr>
declare type sdic = Map<s, s>
declare type dic<T> = Map<s, T>
declare type set = Set<any>
declare type sset = Set<s>
declare type bdic = Map<s, b>
declare type ly = s[]
declare type src = ly
declare type col = any[]
declare type scol = s[]
declare type sy = s[]
declare type sPred = pred<s>
declare type ay = Array<any>
declare type fny = nm[]
declare type sdry = s[][]
declare type sdr = s[]
declare type itr = Itr<any>
declare type sItr = Itr<s>
declare type p = (a: any) => boolean
declare type f = (a: any) => any
declare type sOrRe = s | re
declare type sOrSy = s | s[]
declare type strOpt = string | null
declare type doFun = () => void
