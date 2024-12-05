export function gridCheck(grid: string[][], x: number, y: number): number {
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // down-right
    [1, -1], // down-left
    [-1, 1], // up-right
    [-1, -1], // up-left
  ];

  let found = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (const [dirX, dirY] of directions) {
    const wordArray = [
      [x + dirX, y + dirY],
      [x + dirX * 2, y + dirY * 2],
      [x + dirX * 3, y + dirY * 3],
    ];

    if (wordArray.some((val) => !withinBounds(val[0], val[1], rows, cols))) {
      continue;
    }

    const word = wordArray.map((xy) => grid[xy[0]][xy[1]]).join("");
    if (word.toLowerCase() === "mas") {
      found++;
    }
  }

  return found;
}

export function xmasCheck(grid: string[][], x: number, y: number): number {
  const directions = [
    [1, 1], // down-right
    [1, -1], // down-left
    [-1, 1], // up-right
    [-1, -1], // up-left
  ];

  const rows = grid.length;
  const cols = grid[0].length;

  for (const [dirX, dirY] of directions) {
    const wordArray = [[x + dirX, y + dirY]];

    if (wordArray.some((val) => !withinBounds(val[0], val[1], rows, cols))) {
      return 0;
    }
  }

  // Check if diagnols are both "mas". return 1 if they are
  const wordOne = [grid[x - 1][y - 1], "A", grid[x + 1][y + 1]]
    .join("")
    .toLowerCase()
    .match(/mas|sam/);
  const wordTwo = [grid[x + 1][y - 1], "A", grid[x - 1][y + 1]]
    .join("")
    .toLowerCase()
    .match(/mas|sam/);

  return wordOne && wordTwo ? 1 : 0;
}

function withinBounds(
  x: number,
  y: number,
  rows: number,
  cols: number,
): boolean {
  return x >= 0 && x < rows && y >= 0 && y < cols;
}

export function wordFinder(
  input: string,
  checker: Function,
  letter: string,
): number {
  const grid = input.split("\n").map((line) => line.split(""));
  grid.pop();

  const result = grid
    .map((row, rowIndex) => {
      let count = 0;
      row.forEach((_, colIndex) => {
        if (grid[rowIndex][colIndex].toLowerCase() === letter.toLowerCase())
          count += checker(grid, rowIndex, colIndex);
      });
      return count;
    })
    .reduce((sum, num) => sum + num);
  return result;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", wordFinder(input, gridCheck, "x"));
  console.log("Part 2: ", wordFinder(input, xmasCheck, "a"));
}
