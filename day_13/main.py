import re


def find_prize(machine: str, conversion=0):
    # Cramer's rule
    a1, a2 = tuple(
        map(int, re.findall(r"Button A: X\+(\d+), Y\+(\d+)", machine)[0]))
    b1, b2 = tuple(
        map(int, re.findall(r"Button B: X\+(\d+), Y\+(\d+)", machine)[0]))
    c1, c2 = tuple(
        map(int, re.findall(r"Prize: X=(\d+), Y=(\d+)", machine)[0]))
    c1 += conversion
    c2 += conversion

    x = ((c1 * b2) - (b1 * c2)) / ((a1 * b2) - (b1 * a2))
    y = ((a1 * c2) - (c1 * a2)) / ((a1 * b2) - (b1 * a2))

    if x.is_integer() and y.is_integer():
        return int((x * 3) + (y))

    return 0


def main():
    with open("input.txt", "r") as f:
        input = f.read().split("\n\n")

    tokens = 0
    for machine in input:
        tokens += find_prize(machine)
    print("Part 1: ", tokens)

    tokens = 0
    for machine in input:
        tokens += find_prize(machine, conversion=10000000000000)
    print("Part 2: ", tokens)


if __name__ == "__main__":
    main()
