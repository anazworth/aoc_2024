import unittest


from main import solve


class TestMain(unittest.TestCase):
    def setUp(self):
        with open("example.txt", "r") as f:
            self.input = f.read()

    def test_part_one(self):
        expected = 44
        result, _ = solve(self.input)

        self.assertEqual(expected, result)

    def test_part_two(self):
        expected = 285
        _, result = solve(self.input, savings_target=50)

        self.assertEqual(expected, result)
