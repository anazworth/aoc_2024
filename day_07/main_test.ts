import { assertEquals } from "@std/assert";
import { partOne } from "./main.ts";

Deno.test(function addTest() {
  const input = Deno.readTextFileSync("example.txt");
  assertEquals(partOne(input), 3749);
});
