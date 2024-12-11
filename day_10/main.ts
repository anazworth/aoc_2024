export function partOne(input: string): number {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

  let result = 0;

  map.forEach((line, yIndex) => {
    line.forEach((num, xIndex) => {
      if (num === 0) {
        result += dfsTrailheads(map, [xIndex, yIndex]);
      }
    });
  });

  return result;
}

export function partTwo(input: string): number {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

  let result = 0;

  map.forEach((line, yIndex) => {
    line.forEach((num, xIndex) => {
      if (num === 0) {
        result += dfsDistinctTrailheads(map, [xIndex, yIndex]);
      }
    });
  });

  return result;
}

const directions = [
  [0, -1], // up
  [0, 1], // down
  [-1, 0], // left
  [1, 0], // right
];

function dfsTrailheads(graph: number[][], node: number[]): number {
  const visited = new Set<string>();
  const stack = [];

  const [x, y] = node;
  const key = `${x},${y}`;
  visited.add(key);
  stack.push(node);

  while (stack.length > 0) {
    const current = stack.pop();
    if (current == null) {
      break;
    }

    for (const dir of directions) {
      const temp: number[] = [current[0] + dir[0], current[1] + dir[1]];
      if (
        temp[1] < 0 ||
        temp[1] >= graph.length ||
        temp[0] < 0 ||
        temp[0] >= graph[0].length
      ) {
        continue;
      }
      if (graph[current[1]][current[0]] + 1 !== graph[temp[1]][temp[0]]) {
        continue;
      }
      const [x, y] = temp;
      const key = `${x},${y}`;
      if (!visited.has(key)) {
        visited.add(key);
        stack.push(temp);
      }
    }
  }

  return Array.from(visited).filter((node) => {
    const [x, y] = node.split(",").map(Number);
    return graph[y][x] === 9;
  }).length;
}

function dfsDistinctTrailheads(graph: number[][], node: number[]): number {
  const visited = [];
  const stack = [];

  visited.push(node);
  stack.push(node);

  while (stack.length > 0) {
    const current = stack.pop();
    if (current == null) {
      break;
    }

    for (const dir of directions) {
      const temp: number[] = [current[0] + dir[0], current[1] + dir[1]];
      if (
        temp[1] < 0 ||
        temp[1] >= graph.length ||
        temp[0] < 0 ||
        temp[0] >= graph[0].length
      ) {
        continue;
      }
      if (graph[current[1]][current[0]] + 1 !== graph[temp[1]][temp[0]]) {
        continue;
      }
      if (visited.find((node) => node === temp) === undefined) {
        visited.push(temp);
        stack.push(temp);
      }
    }
  }

  return visited.filter((node) => {
    return graph[node[1]][node[0]] === 9;
  }).length;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
