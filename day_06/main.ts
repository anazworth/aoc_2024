export function partOne(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  // Find the starting point
  const starting = { x: 0, y: 0 };

  grid.forEach((line, lineIndex) => {
    line.forEach((val, valIndex) => {
      if (val === "^") {
        starting.x = valIndex;
        starting.y = lineIndex;
      }
    });
  });
  const resultGrid = findPath(grid, starting, "up");
  if (resultGrid === -1) {
    return 0;
  }
  return resultGrid.flat().filter((x) => x === "x").length;
}

export function partTwo(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  // Find the starting point
  const starting = { x: 0, y: 0 };

  grid.forEach((line, lineIndex) => {
    line.forEach((val, valIndex) => {
      if (val === "^") {
        starting.x = valIndex;
        starting.y = lineIndex;
      }
    });
  });

  let sum = 0;

  const solvedGrid = findPath(grid, starting, "up");
  if (solvedGrid === -1) {
    return 0;
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (x === starting.x && y === starting.y) {
        continue;
      }
      if (solvedGrid[y][x] !== "x") {
        continue;
      }
      // Deepcopy the grid
      const newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[y][x] = "#";
      if (findPath(newGrid, starting, "up") === -1) {
        sum++;
      }
    }
  }

  return sum;
}

type Direction = "up" | "down" | "left" | "right";

const directions: Record<Direction, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

export function nextDir(currentDir: Direction): Direction {
  const dirOrder: Direction[] = ["up", "right", "down", "left"];
  const currentDirIndex = dirOrder.indexOf(currentDir);
  const nextIndex = (currentDirIndex + 1) % dirOrder.length;
  return dirOrder[nextIndex];
}

function calculateNextPos(
  currentPosition: { x: number; y: number },
  dir: Direction,
): { x: number; y: number } {
  return {
    x: currentPosition.x + directions[dir][0],
    y: currentPosition.y + directions[dir][1],
  };
}

function findPath(
  grid: string[][],
  startPosition: { x: number; y: number },
  startDirection: Direction,
) {
  const width = grid[0].length;
  const height = grid.length;

  let position = startPosition;
  let direction = startDirection;

  const seen = new Set();
  while (true) {
    const posKey = `${position.x},${position.y},${direction}`;
    if (seen.has(posKey)) {
      return -1;
    }
    seen.add(posKey);
    // Mark current position
    grid[position.y][position.x] = "x";

    // Calculate next position
    let nextPos = calculateNextPos(position, direction);

    // Check bounds
    if (
      nextPos.x >= width ||
      nextPos.x < 0 ||
      nextPos.y >= height ||
      nextPos.y < 0
    ) {
      return grid;
    }

    // Check for obstacles and turn if needed
    let nextChar = grid[nextPos.y][nextPos.x];
    if (nextChar === "#") {
      direction = nextDir(direction);
      nextPos = calculateNextPos(position, direction);
    }
    // YOU MIGHT HAVE TO TURN TWICE :[
    // I don't want to say how long this took me to figure out
    nextChar = grid[nextPos.y][nextPos.x];
    if (nextChar === "#") {
      direction = nextDir(direction);
      nextPos = calculateNextPos(position, direction);
    }

    // Update position for next iteration
    position = nextPos;
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
