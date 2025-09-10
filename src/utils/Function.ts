/**
 * 
 * @param {string} txt -
 * @param {number} max -
 * @returns 
 */

export function txtSlices(txt:string,max:number=50){
  if(txt.length>=max)return `${txt.slice(0,max)}...`;
  return txt;
}