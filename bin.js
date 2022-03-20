const fs = require('fs');

const radius = 100;
const corners = 720;
const step = 360 / corners;
const polygons = Math.round(360 / step);
const bufferlength = 84 + polygons * 50;
const heights = Array(polygons).fill().map(() => Math.random().toFixed(4) - .5)

function getPointInCircle(angle) {
	x = radius * Math.sin(Math.PI * 2 * angle / 360).toFixed(4);
	y = radius * Math.cos(Math.PI * 2 * angle / 360).toFixed(4);
	// z = 0;
	z = heights[angle / step] || heights[0];
	return [x, y, z];
};

function numToBuf(n) {
	let b = Buffer.alloc(4);
	b.writeFloatLE(n);
	return b;
}

let offset = 80;
let buffer = Buffer.alloc(84);

offset += buffer.writeInt32LE(polygons, offset);

let polyArr = [];
polyArr.push(...Array(polygons).fill()
	.flatMap((_, index) => [
		...[0, 0, 0].map(numToBuf),
		...[0, 0, 0].map(numToBuf),
		...getPointInCircle(index * step).map(numToBuf),
		...getPointInCircle(++index * step).map(numToBuf),
		Buffer.alloc(2)
	]));

// console.log([buffer, ...polyArr].map(x => x.length));

buffer = Buffer.concat([buffer, ...polyArr]);
// buffer = Buffer.concat([buffer, ...polyArr], bufferlength);
console.log(buffer, bufferlength);


fs.writeFile('bin.stl', buffer, err => {
	if (err) return console.log(err);
	console.log('saved');
});