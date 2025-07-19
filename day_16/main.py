from pqueue import Node, PQueue


def solve(input: str) -> tuple[int, int]:
    grid = [list(line) for line in input.split("\n")]

    for r, row in enumerate(grid):
        for c, _ in enumerate(row):
            if grid[r][c] == "S":
                start = (r, c)
            if grid[r][c] == "E":
                end = (r, c)
    assert start
    assert end
    start = Node(0, [(start[0], start[1])], start[0], start[1], 0, 1)

    seen = set()
    pq = PQueue()
    pq.push(start)

    points_on_path = set()

    first_run = True
    part_one = 0
    while not pq.is_empty():
        node: Node = pq.pop()

        state = (node.row, node.col, node.dr, node.dc)
        seen.add(state)

        char = grid[node.row][node.col]

        if char == "E":
            if first_run:
                part_one = node.cost
                first_run = False
            if node.cost == part_one:
                print("ug")
                for points in node.path:
                    points_on_path.add(points)
        if char == "#":
            continue

        nr = node.row + node.dr
        nc = node.col + node.dc
        new_state = (nr, nc, node.dr, node.dc)

        if (
            nr >= 0
            and nr < len(grid)
            and nc >= 0
            and nc < len(grid[0])
            and new_state not in seen
        ):
            pq.push(
                Node(
                    node.cost + 1,
                    list(node.path) + [(nr, nc)],
                    nr,
                    nc,
                    node.dr,
                    node.dc,
                )
            )

        # Turn 90 deg left
        new_dr, new_dc = -node.dc, node.dr
        new_state = (node.row, node.col, new_dr, new_dc)
        if new_state not in seen:
            pq.push(
                Node(
                    node.cost + 1000,
                    list(node.path),
                    node.row,
                    node.col,
                    new_dr,
                    new_dc,
                )
            )

        # Turn 90 deg right
        new_dr, new_dc = node.dc, -node.dr
        new_state = (node.row, node.col, new_dr, new_dc)
        if new_state not in seen:
            pq.push(
                Node(
                    node.cost + 1000,
                    list(node.path),
                    node.row,
                    node.col,
                    new_dr,
                    new_dc,
                )
            )

    return (part_one, len(points_on_path))


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()
    part_one, part_two = solve(input)
    print("Part 1: ", part_one)
    print("Part 2: ", part_two)
