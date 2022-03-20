const fs = require('fs');

let result = ['solid '];

const radius = 100;
const step = 1 / 2;

function getPointInCircle(angle) {
	x = radius * Math.sin(Math.PI * 2 * angle / 360).toFixed(4);
	y = radius * Math.cos(Math.PI * 2 * angle / 360).toFixed(4);
	z = 0; //Math.random().toFixed(4) - .5
	return [x, y, z].join(' ');
};

result.push(...Array(Math.round(360 / step)).fill()
	.map((_, i) => i)
	.map(angle =>
		`facet normal 0 0 0
      outer loop
      vertex 0 0 0
      vertex ${getPointInCircle(angle * step)}
      vertex ${getPointInCircle((angle+1) * step)}
      endloop
      endfacet`
	));


result.push('endsolid ');
result = result.join('\n');

fs.writeFile('text.stl', result, 'utf-8', err => {
	if (err) return console.log(err);
	console.log('saved');
});