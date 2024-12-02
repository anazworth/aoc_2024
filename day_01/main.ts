export function part_one(input: string): number {
  const lines = input.split("\n").map((line) => line.trim());
  lines.pop();
  const left = [];
  const right = [];

  for (const line of lines) {
    const matches = line.match(/(\d*)\s+(\d*)/);
    if (matches) {
      left.push(Number(matches[1]));
      right.push(Number(matches[2]));
    }
  }
  left.sort();
  right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
}

export function part_two(input: string): number {
  const lines = input.split("\n").map((line) => line.trim());
  lines.pop();

  const left = [];
  const right = [];

  for (const line of lines) {
    const matches = line.match(/(\d*)\s+(\d*)/);
    if (matches) {
      left.push(Number(matches[1]));
      right.push(Number(matches[2]));
    }
  }

  const rightMap = new Map<number, number>();

  for (const num of right) {
    rightMap.set(num, (rightMap.get(num) ?? 0) + 1);
  }

  return left
    .map((num) => {
      const foundNum = rightMap.get(num);
      return foundNum ? num * foundNum : 0;
    })
    .reduce((sum, num) => sum + num);
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part one: ", part_one(input));
  console.log("Part two: ", part_two(input));
}
