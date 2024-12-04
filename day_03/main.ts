export function partOne(input: string): number {
  const re = /(mul\(\d{1,3},\d{1,3}\))/g;
  const result = input
    .match(re)
    ?.map((line) => {
      const nums = line.match(/(\d+),(\d+)/);
      return nums ? Number(nums[1]) * Number(nums[2]) : 0;
    })
    .reduce((sum, val) => sum + val);
  return result ? result : 0;
}

export function partTwo(input: string): number {
  const re = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
  const matches = input.match(re);

  let enable = true;
  let result = 0;

  if (!matches) {
    return 0;
  }

  for (const match of matches) {
    switch (match) {
      case "do()": {
        enable = true;
        break;
      }
      case "don't()": {
        enable = false;
        break;
      }
      default: {
        const nums = match.match(/(\d+),(\d+)/);
        if (enable) {
          result += nums ? Number(nums[1]) * Number(nums[2]) : 0;
        }
      }
    }
  }

  return result;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
