/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const reverseList = function(head) {
  let prev = null;
  let curr = head;

  while (curr != null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
const reverseBetween = function(head, m, n) {
  if (m == n) {
    return head;
  }

  let sublistStart = null;
  let sublistEnd = null;
  let beforeSublistStart = null; // pivotal point
  let afterSublistEnd = null; // sublist's tail next

  let i = 1; // starting from 1 since we want to account for head if needed
  let curr = head;

  // identifying the sublist portion
  while (curr && i <= n) {
    if (i < m) {
      beforeSublistStart = curr;
    }
    if (i == m) {
      sublistStart = curr;
    }
    if (i == n) {
      sublistEnd = curr;
      afterSublistEnd = curr.next;
    }

    i++;
    curr = curr.next;
  }

  // de-attach the end of the sublist from
  // the original list
  sublistEnd.next = null;

  // reverse sublist from its starting point
  sublistEnd = reverseList(sublistStart);

  if (beforeSublistStart) {
    beforeSublistStart.next = sublistEnd;
  } else {
    head = sublistEnd;
  }

  // initially sublist start was the starting point
  // after reversing the list, it became the tail
  // of the sublist. The tail of the sublist should have
  // an adjacent neighbor that is the cut off that we made
  // after the sublist ends
  sublistStart.next = afterSublistEnd;

  return head;
};
