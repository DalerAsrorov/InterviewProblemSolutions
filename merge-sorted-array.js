// Input:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// Output: [1,2,2,3,5,6]

const merge = (A, m, B, n) => {
  let i = m - 1,
    j = n - 1,
    maxLen = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (A[i] > B[j]) {
      A[maxLen] = A[i];
      maxLen -= 1;
      i -= 1;
    } else {
      A[maxLen] = B[j];
      j -= 1;
      maxLen -= 1;
    }
  }

  while (j >= 0) {
    A[maxLen] = B[j];
    j -= 1;
    maxLen -= 1;
  }

  return A;
};

const result1 = merge([4, 6, 8, 0, 0, 0], 3, [1, 2, 3], 3);
