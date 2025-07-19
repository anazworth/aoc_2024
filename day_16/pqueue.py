from functools import total_ordering


# I just wanted to mess around with making a min-heap priority queue


class PQueue:
    def __init__(self):
        self.items = [Node(0, [(0, 0)], 0, 0, 0, 0)]

    def push(self, item):
        self.items.append(item)
        self._bubble_up(len(self.items) - 1)

    def pop(self):
        self._exchange(1, len(self.items) - 1)
        max = self.items.pop()
        self._bubble_down(1)
        return max

    def is_empty(self):
        return len(self.items) == 1

    def _bubble_up(self, index):
        parent_index = index // 2

        if index <= 1:
            return

        if self.items[parent_index] <= self.items[index]:
            return

        self._exchange(index, parent_index)
        self._bubble_up(parent_index)

    def _bubble_down(self, index):
        child_index = index * 2

        if child_index > len(self.items) - 1:
            return

        # Only check right child if it exists
        if child_index + 1 <= len(self.items) - 1:
            left = self.items[child_index]
            right = self.items[child_index + 1]
            if right < left:
                child_index += 1

        if self.items[index] <= self.items[child_index]:
            return

        self._exchange(index, child_index)
        self._bubble_down(child_index)

    def _exchange(self, source, target):
        self.items[source], self.items[target] = self.items[target], self.items[source]


@total_ordering
class Node:
    def __init__(self, cost, path, row, col, dr, dc):
        self.cost: int = cost
        self.path: list[tuple[int, int]] = path
        self.row: int = row
        self.col: int = col
        self.dr: int = dr
        self.dc: int = dc

    def __repr__(self) -> str:
        return f"[cost: {self.cost} -> (r, c): ({self.row}, {self.col}) -> dir: {self.dr, self.dc}]\n"

    def __eq__(self, other):
        return self.cost == other.cost

    def __lt__(self, other):
        return self.cost < other.cost
