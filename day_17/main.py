import re


class Computer:
    def __init__(self, a: int, b: int, c: int):
        self.a = a
        self.b = b
        self.c = c
        self.output = []

    def out(self):
        return ",".join(map(str, self.output))

    def compute(self, opcode: int, combo_operand: int):
        operand: int = self._combo_operand(combo_operand)
        match opcode:
            case 0:
                self.a = self.a >> operand
            case 1:
                self.b = self.b ^ combo_operand
            case 2:
                self.b = operand % 8
            case 3:
                if self.a != 0:
                    return combo_operand
            case 4:
                self.b = self.b ^ self.c
            case 5:
                self.output.append(operand % 8)
            case 6:
                self.b = self.a >> operand
            case 7:
                self.c = self.a >> operand

        return None

    def _combo_operand(self, operand: int) -> int:
        match operand:
            case 4:
                return self.a
            case 5:
                return self.b
            case 6:
                return self.c
            case 7:
                raise Exception("should not have 7 here")
            case _:
                return operand


def part_one(input: str):
    a, b, c, *program = list(map(int, re.findall(r"\d+", input)))

    return compute(a, b, c, program)


def compute(a, b, c, program):
    computer = Computer(a, b, c)

    ins = 0
    while ins < len(program):
        opcode = program[ins]
        operand = program[ins + 1]

        result = computer.compute(opcode, operand)

        if result is not None:
            ins = result
        else:
            ins += 2

    return computer.output


def part_two(input: str):
    # https://www.youtube.com/watch?v=02CLAi8sy4c
    # I had to learn a bit about bit shifting from that video, I wasn't able
    # to solve that on my own

    a, b, c, *program = list(map(int, re.findall(r"\d+", input)))

    possible = [0]
    for i in range(len(program)):
        next_possible = []
        for val in possible:
            for j in range(8):
                target = (val << 3) + j
                if compute(target, 0, 0, program) == program[-i - 1 :]:
                    next_possible.append(target)
        possible = next_possible
    return min(possible)


if __name__ == "__main__":
    with open("input.txt", "r") as f:
        input = f.read()

    print("Part 1: ", part_one(input))
    print("Part 2: ", part_two(input))
