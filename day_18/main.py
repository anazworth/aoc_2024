import re
from collections import deque


def part_one(input: str, grid_size=70, bytes=1024):
    lines_raw = input.strip().split("\n")
    lines_str = list(map(lambda line: re.findall(r"\d+", line), lines_raw))
    lines: list[list[int]] = list(map(lambda line: list(map(int, line)), lines_str))

    return find_min_steps(lines, grid_size, bytes)


def part_two(input: str, grid_size=70, bytes=1024):
    lines_raw = input.strip().split("\n")
    lines_str = list(map(lambda line: re.findall(r"\d+", line), lines_raw))
    positions: list[list[int]] = list(map(lambda line: list(map(int, line)), lines_str))

    for x in range(bytes, len(positions)):
        result = find_min_steps(positions, grid_size, x)
        if not result:
            return (
                str(positions[x - 1])
                .removeprefix("[")
                .removesuffix("]")
                .replace(" ", "")
            )

    return find_min_steps(positions, grid_size, bytes)


class Node:
    def __init__(self, r: int, c: int, steps: int = 0, path: list["Node"] = []):
        self.row = r
        self.col = c
        self.steps = steps
        self.path = path


def find_min_steps(positions: list[list[int]], grid_size: int, bytes: int):
    # 0 = empty
    # 1 = bad byte
    grid = [[0] * (grid_size + 1) for _ in range(grid_size + 1)]

    for i in range(bytes):
        (
            c,
            r,
        ) = positions[i]
        grid[r][c] = 1

    q = deque([Node(0, 0, 1)])
    seen = set()

    while q:
        current: Node = q.popleft()
        for nr, nc in [
            (current.row + 1, current.col),
            (current.row, current.col + 1),
            (current.row - 1, current.col),
            (current.row, current.col - 1),
        ]:
            if nr < 0 or nr > grid_size or nc < 0 or nc > grid_size:
                continue
            if grid[nr][nc] == 1:
                continue
            if (nr, nc) in seen:
                continue
            if nr == grid_size and nc == grid_size:
                return current.steps
            seen.add((nr, nc))
            q.append(Node(nr, nc, current.steps + 1))
    return None


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()

    print("Part 1: ", part_one(input))
    print("Part 2: ", part_two(input))
