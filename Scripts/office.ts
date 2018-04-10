import * as cf from './curryfun'
require('winax')
'use strict'
const { assertIsEq, er, sSplitLines, pipe, lyRmvEmpLin, map, dicKset, itrAddPfx, linFstTerm, linLasTerm, setAftIncl, setClone,
    oSrt, oBrw, each, itrFst, itrLas, itrRmvEmp, ssetAddPfxAsLin, sSplitCommaSpc, sSplitLf, sSplitCrLf, sSplitSpc, itrAy,
    setMinus, setWhere, setAy, dmp, where, predsAnd, predNot, compose }
    = cf
const xls = new ActiveXObject('Excel.application')
xls.visible = true

