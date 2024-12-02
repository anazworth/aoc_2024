import { assertEquals } from "@std/assert";
import { part_one } from "./main.ts";

Deno.test(function addTest() {
  const input: string = Deno.readTextFileSync("example.txt");
  console.log(input);
  assertEquals(part_one(input), 2);
});
