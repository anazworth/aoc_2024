export function partOne(input: string): number {
  const garden = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const directions = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0], // right
  ];

  const seenPlots = new Set();
  let sum = 0;
  garden.forEach((line, yIndex) => {
    line.forEach((plot, xIndex) => {
      // Skip plots we've already seen
      const plotKey = `${xIndex},${yIndex}`;

      if (seenPlots.has(plotKey)) return;

      // BFS
      const visited = new Set();
      const queue: number[][] = [];
      queue.push([xIndex, yIndex]);

      while (queue.length > 0) {
        const curr = queue.shift();
        const [currX, currY] = curr ? curr : [0, 0];
        const currKey = `${currX},${currY}`;
        seenPlots.add(currKey);
        visited.add(currKey);

        for (const dir of directions) {
          const nextX = currX + dir[0];
          const nextY = currY + dir[1];
          const nextKey = `${nextX},${nextY}`;

          if (
            visited.has(nextKey) ||
            isWithinBounds(garden, [nextX, nextY]) === false
          ) {
            continue;
          }
          if (plot === garden[nextY][nextX]) {
            queue.unshift([nextX, nextY]);
          }
        }
      }

      const visitedArray = Array.from(visited);
      // Calculate Area
      const area = visitedArray.length;

      // Calculate Perimiter
      let perimiter = 0;

      visited.forEach((item) => {
        if (typeof item !== "string") return;
        const [x, y] = item.split(",").map(Number);
        const currPlot = garden[y][x];

        for (const dir of directions) {
          const nextX = x + dir[0];
          const nextY = y + dir[1];

          if (
            isWithinBounds(garden, [nextX, nextY]) === false ||
            garden[nextY][nextX] !== currPlot
          ) {
            perimiter++;
          }
        }
      });

      sum += area * perimiter;
    });
  });

  return sum;
}

export function partTwo(input: string): number {
  const garden = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const directions = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0], // right
  ];

  const seenPlots = new Set();
  let sum = 0;
  garden.forEach((line, yIndex) => {
    line.forEach((plot, xIndex) => {
      // Skip plots we've already seen
      const plotKey = `${xIndex},${yIndex}`;

      if (seenPlots.has(plotKey)) return;

      // BFS
      const visited = new Set();
      const queue: number[][] = [];
      queue.push([xIndex, yIndex]);

      while (queue.length > 0) {
        const curr = queue.shift();
        const [currX, currY] = curr ? curr : [0, 0];
        const currKey = `${currX},${currY}`;
        seenPlots.add(currKey);
        visited.add(currKey);

        for (const dir of directions) {
          const nextX = currX + dir[0];
          const nextY = currY + dir[1];
          const nextKey = `${nextX},${nextY}`;

          if (
            visited.has(nextKey) ||
            isWithinBounds(garden, [nextX, nextY]) === false
          ) {
            continue;
          }
          if (plot === garden[nextY][nextX]) {
            queue.unshift([nextX, nextY]);
          }
        }
      }

      // Calculate Sides
      let sides = 0;

      visited.forEach((item) => {
        if (typeof item !== "string") return;

        const [x, y] = item.split(",").map(Number);
        const currPlot = garden[y][x];

        // Identify Corners
        let notSame = 0;
        let oob = 0;
        for (const dir of directions) {
          const nextX = x + dir[0];
          const nextY = y + dir[1];

          if (isWithinBounds(garden, [nextX, nextY]) === false) {
            oob++;
            continue;
          }

          if (garden[nextX][nextY] !== currPlot) {
            notSame++;
          }
        }

        if (oob === 2 && notSame === 0) {
          // Outside Corners
          sides += 2;
        } else if (oob === 1 && notSame === 2) {
          sides += 3;
        } else if (notSame === 3) {
          sides += 3;
        } else if (notSame === 2) {
          sides += 2;
        } else if (notSame === 4) {
          sides += 8;
        }
      });

      // Calculate Perimiter
      let perimiter = 0;

      visited.forEach((item) => {
        if (typeof item !== "string") return;
        const [x, y] = item.split(",").map(Number);
        const currPlot = garden[y][x];

        for (const dir of directions) {
          const nextX = x + dir[0];
          const nextY = y + dir[1];

          if (
            isWithinBounds(garden, [nextX, nextY]) === false ||
            garden[nextY][nextX] !== currPlot
          ) {
            perimiter++;
          }
        }
      });

      sum += (sides * perimiter) / 2;
    });
  });

  return sum;
}

function isWithinBounds(grid: string[][], pos: number[]): boolean {
  const width = grid[0].length;
  const height = grid.length;
  const [x, y] = pos;

  if (x < 0 || x >= width || y < 0 || y >= height) return false;

  return true;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
