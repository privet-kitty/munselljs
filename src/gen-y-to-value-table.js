/* 
   Usage: node -r esm gen-y-to-value-table.js
*/
import {munsellValueToY} from './convert.js';
import fs from 'fs';

function findRoot (func, rhs, min, max, threshold) {
  // bisection method
  let mid = (min + max) * 0.5;
  let lhs = func(mid);
  while (Math.abs(lhs - rhs) > threshold) {
    if (lhs > rhs){
      max = mid;
    } else {
      min = mid;
    }
    mid = (min + max) * 0.5;
    lhs = func(mid);
  }
  return mid;
}

const yToMunsellValueTable = Array(1001).fill().map((_, i) => {
  return findRoot(munsellValueToY, i * 1e-3, 0, 10, 1e-9);
});
yToMunsellValueTable[0] = 0;
yToMunsellValueTable[1000] = 10;

fs.writeFileSync("y-to-value-table.js",
                 `export const yToMunsellValueTable = ${JSON.stringify(yToMunsellValueTable)};\n`);
