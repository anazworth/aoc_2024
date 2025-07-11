import unittest

from main import find_prize


class TestMain(unittest.TestCase):
    def test_find_prize(self):
        with open("example.txt", "r") as f:
            input = f.read().split("\n\n")

            self.assertEqual(280, find_prize(input[0]))

            tokens = 0
            for machine in input:
                tokens += find_prize(machine)

            self.assertEqual(480, tokens)
