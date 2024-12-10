export function partOne(input: string): number {
  const diskMap: (number | string)[] = [];

  let fileCounter: number = 0;

  input
    .trim()
    .split("")
    .forEach((block, index) => {
      if (index % 2 === 0) {
        for (let i = 0; i < Number(block); i++) {
          diskMap.push(fileCounter);
        }
        fileCounter++;
      } else {
        for (let i = 0; i < Number(block); i++) {
          diskMap.push(".");
        }
      }
    });

  let left = 0;
  let right = diskMap.length - 1;

  while (left < right) {
    if (typeof diskMap[left] === "number") {
      left++;
      continue;
    }
    if (typeof diskMap[right] === "string") {
      right--;
      continue;
    }
    [diskMap[left], diskMap[right]] = [diskMap[right], diskMap[left]];
  }

  return diskMap
    .filter((char) => typeof char === "number")
    .map((num, index) => num * index)
    .reduce((sum, val) => sum + val);
}

export function partTwo(input: string): number {}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
