const o = []
const set = new Set
const n = 10000
for (let i = 0; i <= n; i++) {
	const a = Math.random()
	o.push(a)
	set.add(a)
}
eq()
for(let i = 0; i< 100; i++) {
	del(i)
	eq()
}
debugger
function del(i) {
	const a = o[i]
	o.splice(i,1)
	set.delete(a)
	console.log(i,a)
}
function eq() {
	if (set.size !== o.length)
		debugger
	let i = 0
	for (let itm of set) {
		if (itm !== o[i++])
			debugger
	}
}
function randN() {
	return Math.random() * set.size
}
