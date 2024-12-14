import { assertEquals } from "@std/assert";
import { partOne } from "./main.ts";

Deno.test("Part 1 Test", () => {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input, 6), 22);
  assertEquals(partOne(input, 25), 55312);
});
