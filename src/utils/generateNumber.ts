export function generateRandom(maxLimit: number = 100):number {
    let rand = Math.random() * maxLimit;
  
    rand = Math.floor(rand); // 99
  
    return rand;
}