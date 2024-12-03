import { assertEquals } from "@std/assert";
import { part_one, part_two } from "./main.ts";

Deno.test(function partOneTest() {
  const input: string = Deno.readTextFileSync("example.txt");
  assertEquals(part_one(input), 2);
});

Deno.test(function partTwoTest() {
  const input: string = Deno.readTextFileSync("example.txt");
  assertEquals(part_two(input), 4);
});
