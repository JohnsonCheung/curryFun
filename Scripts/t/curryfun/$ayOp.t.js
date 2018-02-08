const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
let act
act = $.ayClone([1, 2, 3]); eq([1, 2, 3])(act)
end()