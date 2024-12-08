type Coords = {
  x: number;
  y: number;
};

export function partOne(input: string): number {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const antennaMap = new Map<string, Coords[]>();

  lines.forEach((line, yIndex) =>
    line.forEach((char, xIndex) => {
      if (char === ".") {
        return;
      }
      const seen = antennaMap.has(char);
      if (seen) {
        const prev = antennaMap.get(char);
        prev?.push({ x: xIndex, y: yIndex });
        antennaMap.set(char, prev ? prev : []);
      } else {
        antennaMap.set(char, [{ x: xIndex, y: yIndex }]);
      }
    }),
  );

  // console.log(antennaMap);
  const height = lines.length;
  const width = lines[0].length;
  const foundAntinodes = new Set();

  for (const nodes of antennaMap.values()) {
    nodes.forEach((node, i) => {
      nodes.forEach((node2, j) => {
        if (i !== j) {
          const antinode: Coords = {
            x: node2.x - node.x + node2.x,
            y: node2.y - node.y + node2.y,
          };
          isWithinBounds(width, height, antinode)
            ? foundAntinodes.add(`${antinode.x},${antinode.y}`)
            : 0;
        }
      });
    });
  }

  return foundAntinodes.size;
}

export function partTwo(input: string): number {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const antennaMap = new Map<string, Coords[]>();

  lines.forEach((line, yIndex) =>
    line.forEach((char, xIndex) => {
      if (char === ".") {
        return;
      }
      const seen = antennaMap.has(char);
      if (seen) {
        const prev = antennaMap.get(char);
        prev?.push({ x: xIndex, y: yIndex });
        antennaMap.set(char, prev ? prev : []);
      } else {
        antennaMap.set(char, [{ x: xIndex, y: yIndex }]);
      }
    }),
  );

  // console.log(antennaMap);
  const height = lines.length;
  const width = lines[0].length;
  const foundAntinodes = new Set();

  for (const nodes of antennaMap.values()) {
    nodes.forEach((node, i) => {
      nodes.forEach((node2, j) => {
        foundAntinodes.add(`${node2.x},${node2.y}`);
        if (i !== j) {
          const move: Coords = {
            x: node2.x - node.x,
            y: node2.y - node.y,
          };
          const antinode: Coords = {
            x: move.x + node2.x,
            y: move.y + node2.y,
          };
          let inBounds = true;
          while (inBounds) {
            isWithinBounds(width, height, antinode)
              ? foundAntinodes.add(`${antinode.x},${antinode.y}`)
              : (inBounds = false);
            (antinode.x = move.x + antinode.x),
              (antinode.y = move.y + antinode.y);
          }
        }
      });
    });
  }

  return foundAntinodes.size;
}

function isWithinBounds(width: number, height: number, pos: Coords): boolean {
  if (pos.x < 0 || pos.x >= width || pos.y < 0 || pos.y >= height) {
    return false;
  }
  return true;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part 1: ", partOne(input));
  console.log("Part 2: ", partTwo(input));
}
