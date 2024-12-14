export function partOne(input: string, blinks: number): number {
  const stones = input.trim().split(" ").map(Number);

  let sum = 0;
  const seenStones = new Map();

  for (const stone of stones) {
    sum += processStone(stone, blinks, seenStones);
  }

  return sum;
}

function processStone(
  stone: number,
  blinks: number,
  seenStones: Map<string, number>,
): number {
  let sum;

  const key = `${stone} ${blinks}`;

  if (seenStones.has(key)) {
    const seen = seenStones.get(key);
    return seen !== undefined ? seen : 0;
  }

  // Base Case
  if (blinks === 0) {
    sum = 1;
  } else if (stone === 0) {
    sum = processStone(1, blinks - 1, seenStones);
  } else if (String(stone).length % 2 === 1) {
    sum = processStone(stone * 2024, blinks - 1, seenStones);
  } else {
    const [leftSplit, rightSplit] = splitStone(String(stone));
    sum =
      processStone(leftSplit, blinks - 1, seenStones) +
      processStone(rightSplit, blinks - 1, seenStones);
  }

  seenStones.set(key, sum);

  return sum;
}

function splitStone(stone: string): number[] {
  const middleIndex = stone.length / 2;
  return [
    Number(stone.substring(0, middleIndex)),
    Number(stone.substring(middleIndex)),
  ];
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input, 25));
  console.log("Part 2: ", partOne(input, 75));
}
