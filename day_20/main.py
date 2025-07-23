from collections import defaultdict, deque
from dataclasses import dataclass


@dataclass(frozen=True)
class Position:
    row: int
    col: int
    distance: int


def solve(input: str, savings_target=100):
    grid = list(map(list, input.strip().split("\n")))

    for r, row in enumerate(grid):
        for c, value in enumerate(row):
            if value == "S":
                start = Position(row=r, col=c, distance=0)
                break
        else:
            continue

    seen_positions = set()
    track_positions = {}
    q = deque()
    q.append(start)

    while q:
        current = q.popleft()
        seen_positions.add((current.row, current.col))

        if (
            current.row < 0
            or current.row >= len(grid)
            or current.col < 0
            or current.col >= len(grid[0])
        ):
            continue
        char = grid[current.row][current.col]
        if char == "#":
            continue
        if char == "." or char == "E" or char == "S":
            track_positions[(current.row, current.col)] = current.distance

        for nr, nc in [
            (current.row, current.col - 1),
            (current.row, current.col + 1),
            (current.row - 1, current.col),
            (current.row + 1, current.col),
        ]:
            if (nr, nc) not in seen_positions:
                q.append(Position(row=nr, col=nc, distance=current.distance + 1))

    cheats = {}

    directions = [(0, 2), (0, -2), (2, 0), (-2, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]

    for pos, dist in track_positions.items():
        r, c = pos
        for dr, dc in directions:
            nr = r + dr
            nc = c + dc

            if (nr, nc) in track_positions:
                savings = track_positions.get((nr, nc)) - dist - 2
                cheats[(pos, (dr, dc))] = savings

    part_one = len([cheat for cheat in cheats.values() if cheat >= 100]) + 1

    mega_cheats = {}

    track_positions = [
        Position(pos[0], pos[1], distance=dist) for pos, dist in track_positions.items()
    ]

    for pos in track_positions:
        for end in track_positions:
            result = man_dist(pos, end, 20)
            if not result:
                continue
            mega_cheats[(pos.row, pos.col, end.row, end.col)] = result

    mega_cheats = {
        cheat: savings
        for cheat, savings in mega_cheats.items()
        if savings >= savings_target
    }
    cheat_counter = defaultdict(int)
    for savings in mega_cheats.values():
        cheat_counter[savings] += 1

    print(cheat_counter)
    print(len(cheat_counter))

    return (part_one, len(mega_cheats))


def man_dist(start: Position, end: Position, max: int) -> int | None:
    man_dist = abs(start.row - end.row) + abs(start.col - end.col)

    if man_dist <= max:
        dist = end.distance - start.distance - man_dist
        if dist > 0:
            return dist
    return None


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()

    part_one, part_two = solve(input)
    print("Part 1: ", part_one)
    print("Part 2: ", part_two)
