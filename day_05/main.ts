export function partOne(input: string): number {
  const [rules, pages] = input.trim().split("\n\n");

  const ruleGraph = new Map<number, Set<number>>();

  rules.split("\n").forEach((rule) => {
    const [left, right] = rule.split("|").map(Number);
    const found = ruleGraph.get(right);
    if (found !== undefined) {
      found.add(left);
      ruleGraph.set(right, found);
    } else {
      ruleGraph.set(right, new Set([left]));
    }
  });

  const lines = pages.split("\n").map((line) => line.split(",").map(Number));

  let result = 0;

  for (const line of lines) {
    const middle = line[Math.floor(line.length / 2)];
    let goodLine = true;

    for (let i = 1; i < line.length; i++) {
      const leftSide = line.slice(0, i);
      const current = line[i];
      const rules = ruleGraph.get(current);

      if (rules === undefined) {
        goodLine = false;
        break;
      }
      for (const val of leftSide) {
        if (!rules.has(val)) {
          goodLine = false;
        }
      }
    }

    if (goodLine == true) {
      result += middle;
    }
  }

  return result;
}

export function partTwo(input: string): number {
  const [rules, pages] = input.trim().split("\n\n");

  const ruleGraph = new Map<number, Set<number>>();

  rules.split("\n").forEach((rule) => {
    const [left, right] = rule.split("|").map(Number);
    const found = ruleGraph.get(right);
    if (found !== undefined) {
      found.add(left);
      ruleGraph.set(right, found);
    } else {
      ruleGraph.set(right, new Set([left]));
    }
  });

  const lines = pages.split("\n").map((line) => line.split(",").map(Number));

  let result = 0;

  for (const line of lines) {
    let goodLine = true;

    for (let i = 1; i < line.length; i++) {
      const leftSide = line.slice(0, i);
      const current = line[i];
      const rules = ruleGraph.get(current);

      if (rules === undefined) {
        goodLine = false;
        break;
      }
      for (const val of leftSide) {
        if (!rules.has(val)) {
          goodLine = false;
        }
      }
    }

    if (goodLine == false) {
      line.sort((a: number, b: number) => {
        const aRules = ruleGraph.get(a) || new Set(); // Default to empty set if undefined
        const bRules = ruleGraph.get(b) || new Set();

        const aMatches = Array.from(aRules).filter((num) =>
          line.includes(num),
        ).length;
        const bMatches = Array.from(bRules).filter((num) =>
          line.includes(num),
        ).length;

        return aMatches - bMatches; // Sort by ascending overlap count
      });
      const middle = line[Math.floor(line.length / 2)];
      result += middle;
    }
  }

  return result;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log("Part one: ", partOne(input));
  console.log("Part two: ", partTwo(input));
}
