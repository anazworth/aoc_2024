import unittest


from main import solve


class TestMain(unittest.TestCase):
    def setUp(self):
        with open("example.txt", "r") as f:
            self.input = f.read()

        with open("example_2.txt", "r") as f:
            self.input_2 = f.read()

    def test_part_one(self):
        expected = 7036
        result, _ = solve(self.input)

        self.assertEqual(expected, result)

    def test_part_two(self):
        expected = 45
        _, result = solve(self.input)

        self.assertEqual(expected, result)

        expected = 64
        _, result = solve(self.input_2)

        self.assertEqual(expected, result)
