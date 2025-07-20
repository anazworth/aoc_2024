import unittest


from main import part_one, part_two


class TestMain(unittest.TestCase):
    def setUp(self):
        with open("example.txt", "r") as f:
            self.input = f.read()

    def test_part_one(self):
        expected = 22
        result = part_one(self.input, grid_size=6, bytes=12)

        self.assertEqual(expected, result)

    def test_part_two(self):
        expected = "6,1"
        result = part_two(self.input, grid_size=6, bytes=21)

        self.assertEqual(expected, result)
