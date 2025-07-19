# dirs = {">": (1, 0), "<": (-1, 0), "^": (0, -1), "v": (0, 1)}
dirs = {">": (0, 1), "<": (0, -1), "^": (-1, 0), "v": (1, 0)}


def part_one(input: str):
    grid, moves = parse_input(input)

    for r, row in enumerate(grid):
        for c, _ in enumerate(row):
            if grid[r][c] == "@":
                break
        else:
            continue
        break

    pos = (r, c)
    print(pos)

    for move in moves:
        dr, dc = dirs.get(move, (0, 0))
        targets = []
        cur_r = pos[0]
        cur_c = pos[1]

        moving = True
        while True:
            cur_r += dr
            cur_c += dc
            char = grid[cur_r][cur_c]
            if char == "#":
                moving = False
                break
            if char == "O":
                targets.append((cur_r, cur_c))
            if char == ".":
                break
            if char == "@":
                break

        if not moving:
            continue

        grid[pos[0]][pos[1]] = "."
        grid[pos[0] + dr][pos[1] + dc] = "@"

        for box_r, box_c in targets:
            grid[box_r + dr][box_c + dc] = "O"
        pos = (pos[0] + dr, pos[1] + dc)

    return sum(
        100 * r + c
        for r in range(len(grid))
        for c in range(len(grid[0]))
        if grid[r][c] == "O"
    )


def widen_grid(original_grid):
    grid = []

    wide_chars = {".": "..", "@": "@.", "#": "##", "O": "[]"}
    for row in original_grid:
        new_row = []
        for char in row:
            new_row.append(wide_chars[char][0])
            new_row.append(wide_chars[char][1])
        grid.append(new_row)
    return grid


def part_two(input: str):
    original_grid, moves = parse_input(input)

    grid = widen_grid(original_grid)

    for r, row in enumerate(grid):
        for c, _ in enumerate(row):
            if grid[r][c] == "@":
                break
        else:
            continue
        break

    pos = (r, c)

    for move in moves:
        dr, dc = dirs.get(move, (0, 0))
        targets = [pos]
        cur_r = pos[0]
        cur_c = pos[1]

        moving = True
        for cur_r, cur_c in targets:
            next_r = cur_r + dr
            next_c = cur_c + dc
            char = grid[next_r][next_c]
            if (next_r, next_c) in targets:
                continue
            if char == "#":
                moving = False
                break
            if char == "[":
                targets.append((next_r, next_c))
                targets.append((next_r, next_c + 1))
            if char == "]":
                targets.append((next_r, next_c))
                targets.append((next_r, next_c - 1))
            if char == "@":
                continue

        if not moving:
            continue

        target_dict = {}
        for target_r, target_c in targets:
            target_dict[(target_r, target_c)] = grid[target_r][target_c]
            grid[target_r][target_c] = "."
        for target_r, target_c in targets:
            grid[target_r + dr][target_c + dc] = target_dict[(target_r, target_c)]
        pos = (pos[0] + dr, pos[1] + dc)

    return sum(
        100 * r + c
        for r in range(len(grid))
        for c in range(len(grid[0]))
        if grid[r][c] == "["
    )


def parse_input(input: str):
    grid, moves = input.split("\n\n")
    grid = [list(line) for line in grid.split("\n")]
    moves = list(moves.rstrip("\n"))
    return (grid, moves)


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()
    print("Part 1: ", part_one(input))
    print("Part 2: ", part_two(input))
