import { assertEquals } from "@std/assert";
import { part_one, part_two } from "./main.ts";

Deno.test(async function part_one_test() {
  const input = await Deno.readTextFile("example.txt");
  const result = part_one(input);
  assertEquals(result, 11);
});

Deno.test(function part_two_test() {
  const input = Deno.readTextFileSync("example.txt");
  const result = part_two(input);
  assertEquals(result, 31);
});
