import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./main.ts";

Deno.test(function partOneTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input), 36);
});

Deno.test(function partTwoTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partTwo(input), 81);
});
