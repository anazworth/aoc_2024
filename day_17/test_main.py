import unittest


from main import part_one, part_two


class TestMain(unittest.TestCase):
    def setUp(self):
        with open("example.txt", "r") as f:
            self.input = f.read()
        with open("example_2.txt", "r") as f:
            self.input_2 = f.read()
        with open("example_3.txt", "r") as f:
            self.input_3 = f.read()
        with open("example_4.txt", "r") as f:
            self.input_4 = f.read()

    def test_part_one(self):
        expected = "4,6,3,5,6,3,5,2,1,0"
        result = part_one(self.input)

        self.assertEqual(expected, result)

        expected = "0,1,2"
        result = part_one(self.input_2)

        self.assertEqual(expected, result)

        expected = "4,2,5,6,7,7,7,7,3,1,0"
        result = part_one(self.input_3)

        self.assertEqual(expected, result)

    def test_part_two(self):
        expected = 117440
        result = part_two(self.input_4)

        self.assertEqual(expected, result)
