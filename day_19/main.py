from functools import cache


def part_one(input: str):
    towels, designs = input.strip().split("\n\n")
    towels = towels.strip().split(", ")
    designs = designs.strip().split("\n")

    sum = 0
    for design in designs:
        if good_design(design, tuple(towels)):
            sum += 1
    return sum


def part_two(input: str):
    towels, designs = input.strip().split("\n\n")
    towels = towels.strip().split(", ")
    designs = designs.strip().split("\n")

    sum = 0
    for design in designs:
        if good_design(design, tuple(towels)):
            sum += count_good_designs(design, tuple(towels))
    return sum


@cache
def good_design(design: str, towels: tuple[str]):
    if design in towels:
        return True
    for towel in towels:
        if design.startswith(towel):
            if good_design(design[len(towel) :], towels):
                return True
    return False


@cache
def count_good_designs(design: str, towels: tuple[str]):
    if design == "":
        return 1
    count = 0
    for towel in towels:
        if design.startswith(towel):
            count += count_good_designs(design[len(towel) :], towels)
    return count


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()

    print("Part 1: ", part_one(input))
    print("Part 2: ", part_two(input))
