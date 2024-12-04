import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./main.ts";

Deno.test(function partOneTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input), 161);
});

Deno.test(function partTwoTest() {
  const input = Deno.readTextFileSync("example2.txt");
  assertEquals(partTwo(input), 48);
});
