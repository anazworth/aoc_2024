import { assertEquals } from "@std/assert";
import { wordFinder, gridCheck, xmasCheck } from "./main.ts";

const input = Deno.readTextFileSync("example.txt");

Deno.test(function partOneTest() {
  assertEquals(wordFinder(input, gridCheck, "x"), 18);
});

Deno.test(function partTwoTest() {
  assertEquals(wordFinder(input, xmasCheck, "a"), 9);
});
