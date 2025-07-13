# dirs = {">": (1, 0), "<": (-1, 0), "^": (0, -1), "v": (0, 1)}
dirs = {">": (0, 1), "<": (0, -1), "^": (-1, 0), "v": (1, 0)}


def part_one(input: str):
    grid, moves = parse_input(input)

    for r, row in enumerate(grid):
        for c, col in enumerate(row):
            if grid[r][c] == "@":
                break
        else:
            continue
        break

    pos = (r, c)
    print(pos)

    for move in moves:
        dr, dc = dirs.get(move, (0, 0))
        targets = [pos]
        cur_r = pos[0]
        cur_c = pos[1]

        moving = True
        while True:
            cur_r += dr
            cur_c += dc
            char = grid[cur_r][cur_c]
            print(char)
            if char == "#":
                moving = False
                break
            if char == "O":
                targets.append((cur_r, cur_c))
                continue
            if char == ".":
                break
            if char == "@":
                break

        if not moving:
            continue

        grid[pos[0]][pos[1]] = "."
        grid[pos[0] + dr][pos[1] + dc] = "@"

        for box_r, box_c in targets[1:]:
            grid[box_r + dr][box_c + dc] = "O"
        pos = (pos[0] + dr, pos[1] + dc)

    return sum(
        100 * r + c
        for r in range(len(grid))
        for c in range(len(grid[0]))
        if grid[r][c] == "O"
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
