import re
import functools
import operator
from dataclasses import dataclass


@dataclass()
class Robot:
    px: int
    py: int
    vx: int
    vy: int

    def navigate(self, seconds, grid_x, grid_y):
        for _ in range(seconds):
            self.px += self.vx
            if self.px >= grid_x:
                self.px = self.px - grid_x
            if self.px < 0:
                self.px = self.px + grid_x

            self.py += self.vy
            if self.py >= grid_y:
                self.py = self.py - grid_y
            if self.py < 0:
                self.py = self.py + grid_y


def part_one(
    input: list[str],
    grid_x,
    grid_y,
    seconds=100,
) -> int:
    quadrants = [0] * 5

    for line in input:
        bot = parse_line(line)
        bot.navigate(seconds, grid_x, grid_y)
        quad = find_quadrant(bot, grid_x, grid_y)
        quadrants[quad] += 1

    quadrants.pop(0)
    return functools.reduce(operator.mul, quadrants, 1)


def part_two(input: list[str], grid_x: int, grid_y: int, max_seconds=10):
    bots = [parse_line(line) for line in input]

    for second in range(max_seconds):
        # Clear the screen for better animation effect
        # os.system("cls" if os.name == "nt" else "clear")

        # Create a blank grid
        grid = [["." for _ in range(grid_x)] for _ in range(grid_y)]

        for bot in bots:
            bot.navigate(1, grid_x, grid_y)  # Move each bot by 1 second
            x, y = bot.px, bot.py
            grid[y][x] = "#"  # Mark bot position

        # Check the grid for 12ish continuous '#'s
        found_pattern = False
        for row in grid:
            row_str = "".join(row)
            if "#" * 10 in row_str:  # Check for 10 continuous '#' symbols
                found_pattern = True
                break

        # Print the grid
        if found_pattern:
            print(f"Second: {second + 1}\n")
            for row in grid:
                print("".join(row))

        found_pattern = False
        if second > 18_260:
            break


def parse_line(line: str):
    # p=0,4 v=3,-3
    matches = re.findall(r"p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)", line)
    if matches:
        return Robot(*map(int, matches[0]))  # Unpack and convert to int
    raise Exception("Failed to parse Robot from line: ", line)


def find_quadrant(bot: Robot, grid_x, grid_y) -> int:
    x = int(grid_x / 2)
    y = int(grid_y / 2)

    if bot.px < x:
        if bot.py < y:
            return 1
        if bot.py > y:
            return 3

    if bot.px > x:
        if bot.py < y:
            return 2
        if bot.py > y:
            return 4
    return 0


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read().split("\n")
        input.pop()

    print("Part 1: ", part_one(input, 101, 103, seconds=100))
    part_two(input, 101, 103, 10_000_000)
