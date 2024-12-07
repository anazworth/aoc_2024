import { assertEquals } from "@std/assert";
import { partOne, nextDir, partTwo } from "./main.ts";

Deno.test(function partOneTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input), 41);
});

Deno.test(function partTwoTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partTwo(input), 6);
});

Deno.test(function nextDirTest() {
  assertEquals(nextDir("up"), "right");
  assertEquals(nextDir("down"), "left");
});
