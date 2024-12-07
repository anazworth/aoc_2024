type OperatorFunction = (a: number, b: number) => number;

type Operation = "mul" | "add" | "concat";

// This is the most 'big brain' thing I've ever done in my life
const Operators: Record<Operation, OperatorFunction> = {
  add: (a: number, b: number) => a + b,
  mul: (a: number, b: number) => a * b,
  concat: (a: number, b: number) => Number(`${a}${b}`),
};

function findResult(
  numbers: number[],
  expected: number,
  possibleOps: Operation[],
): Operation[] | null {
  if (numbers.length === 2) {
    for (const op of possibleOps as Operation[]) {
      if (Operators[op](numbers[0], numbers[1]) === expected) {
        return [op];
      }
    }
    return null;
  }

  for (const op of possibleOps as Operation[]) {
    const first = Operators[op](numbers[0], numbers[1]);
    const remaining = [first, ...numbers.slice(2)];

    const subResult = findResult(remaining, expected, possibleOps);
    if (subResult !== null) {
      return [op, ...subResult];
    }
  }
  return null;
}

export function partOne(input: string): number {
  const lines = input.trim().split("\n");
  console.log(lines);
  return lines
    .map((line) => {
      let [left, right] = line.split(": ");
      const expected = Number(left);
      const nums = right.split(" ").map(Number);
      return findResult(nums, expected, ["add", "mul"]) !== null ? expected : 0;
    })
    .reduce((sum, val) => sum + val);
}

export function partTwo(input: string): number {
  const lines = input.trim().split("\n");
  console.log(lines);
  return lines
    .map((line) => {
      let [left, right] = line.split(": ");
      const expected = Number(left);
      const nums = right.split(" ").map(Number);
      return findResult(nums, expected, ["add", "mul", "concat"]) !== null
        ? expected
        : 0;
    })
    .reduce((sum, val) => sum + val);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
