export function part_one(input: string): number {
  const lines = input.split("\n").map((line) => line.split(" ").map(Number));
  lines.pop();

  const result = lines
    .map((line) => {
      if (line[0] == line[1]) {
        return false;
      }
      const selectedFunc =
        line[0] > line[1] ? handle_decreasing : handle_increasing;
      return selectedFunc(line);
    })
    .reduce((sum, val) => (val === true ? sum + 1 : sum), 0);

  return result;
}

function handle_decreasing(input: number[]): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    const current = input[i];
    const next = input[i + 1];
    if (current - next > 3 || current - next < 1 || next >= current) {
      return false;
    }
  }
  return true;
}

function handle_increasing(input: number[]): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    const current = input[i];
    const next = input[i + 1];
    if (next - current > 3 || next - current < 1 || next <= current) {
      return false;
    }
  }
  return true;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part one: ", part_one(input));
}
