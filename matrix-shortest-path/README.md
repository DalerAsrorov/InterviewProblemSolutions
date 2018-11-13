# Shortest path between two points in matrix (2D array)

## Description

Given an area as a 2D array, find the shortest path to the target in the matrix.

_Conditions:_

- Robot can only go left, right, down, up
- Should get to the point following the _shortest path_

Each element in the matrix contains a number:

- 0 - represents there is no road
- 1 - represents a road (means the user can follow)
- 9 - represents the value of the target
  Output: number of steps required to follow the shortest path from (0, 0) to (x, y) where (x, y) is the coordinates of the target.

## Examples

### 1

**Input:**

```
[
    [1, 1, 0],
    [1, 1, 0],
    [1, 9, 0],
]
```

**Output:** 3 (1 => 1 => 1 => 9)

### 3

**Input:**

```
[
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 9, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]
```

**Output:** 6
