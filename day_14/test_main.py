import unittest

from main import find_quadrant, parse_line, Robot, part_one


class TestMain(unittest.TestCase):
    def test_parse_line(self):
        line = "p=0,4 v=3,-3"

        expected = Robot(0, 4, 3, -3)
        result = parse_line(line)

        self.assertEqual(expected, result)

    def test_robot_navigate(self):
        # 1 second
        bot = Robot(2, 4, 2, -3)
        bot.navigate(seconds=1, grid_x=11, grid_y=7)

        self.assertEqual(4, bot.px, "Robot's x-axis does not match")
        self.assertEqual(1, bot.py, "Robot's y-axis does not match")

        # 5 seconds
        bot = Robot(2, 4, 2, -3)
        bot.navigate(seconds=5, grid_x=11, grid_y=7)

        self.assertEqual(1, bot.px, "Robot's x-axis does not match")
        self.assertEqual(3, bot.py, "Robot's y-axis does not match")

    def test_find_quadrant(self):
        # 1st quad
        bot = Robot(1, 1, 1, 1)

        expected = 1
        result = find_quadrant(bot, 11, 7)

        self.assertEqual(expected, result, "Robot not in correct quadrant")

        # 4th quad
        bot = Robot(10, 10, 1, 1)

        expected = 4
        result = find_quadrant(bot, 11, 7)

        self.assertEqual(expected, result, "Robot not in correct quadrant")

        # No quad
        bot = Robot(5, 10, 1, 1)

        expected = 0
        result = find_quadrant(bot, 11, 7)

        self.assertEqual(expected, result, "Robot not in correct quadrant")

    def test_part_one(self):
        with open("example.txt", "r") as f:
            input = f.read().split("\n")
            input.pop()

        expected = 12
        result = part_one(input, 11, 7, 100)

        self.assertEqual(expected, result, "Part 1 doesn't match expected")


if __name__ == "__main__":
    unittest.main()
