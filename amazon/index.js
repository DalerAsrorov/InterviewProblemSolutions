/*
Given a boolean 2D bitmap, find the number of islands.

```
1, 1, 0, 0, 0
0, 1, 0, 0, 1,
1, 0, 0, 1, 1,
0, 0, 0, 0, 0,
1, 0, 1, 0, 1
```

1 is a land, 0 is a water. And island is a connected 1-s vertically or horizontally.
*/

const TEST1 = [
  [1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1]
];

const calculateNumberOfIslands = bitmap => {
  const rows = bitmap.length;
  const columns = bitmap[0].length;
  let queue = [bitmap[0][0]];

  while (queue.length > 0) {}
};

calculateNumberOfIslands(TEST1);
