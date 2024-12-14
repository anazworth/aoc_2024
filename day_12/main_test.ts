import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./main.ts";

Deno.test("Part 1 test", () => {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input), 1930);
});

Deno.test("Part 2 test", () => {
  const input = Deno.readTextFileSync("example2.txt");
  assertEquals(partTwo(input), 368);
});
