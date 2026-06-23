const axios = require("axios");

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] =
      [this.heap[j], this.heap[i]];
  }

  insert(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (
      index > 0 &&
      this.heap[this.parent(index)].score >
      this.heap[index].score
    ) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  removeMin() {
    if (this.heap.length === 1)
      return this.heap.pop();

    const min = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.heapifyDown();

    return min;
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      let smallest = index;

      const left = this.left(index);
      const right = this.right(index);

      if (
        left < this.heap.length &&
        this.heap[left].score <
        this.heap[smallest].score
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.heap[right].score <
        this.heap[smallest].score
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);

      index = smallest;
    }
  }

  getTopNotifications() {
    return [...this.heap]
      .sort((a, b) => b.score - a.score);
  }
}

async function fetchNotifications() {

  try {

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5nYWRpY2hpcnVzYW1lZXJhLjIzLml0QGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjE5NDA0MywiaWF0IjoxNzgyMTkzMTQzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDQ5YjcyNGQtMDBlOS00NGU3LThhYWEtYzA5ZjYxNmVmZmZlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicyBjaGlydSBzYW1lZXJhIiwic3ViIjoiOTdlZjk2ZDgtMTFmMi00NzBmLWI1NjctOTI3Njk2NWVlNzNmIn0sImVtYWlsIjoic2FuZ2FkaWNoaXJ1c2FtZWVyYS4yMy5pdEBhbml0cy5lZHUuaW4iLCJuYW1lIjoicyBjaGlydSBzYW1lZXJhIiwicm9sbE5vIjoiYTIzMTI2NTExMTE0IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiOTdlZjk2ZDgtMTFmMi00NzBmLWI1NjctOTI3Njk2NWVlNzNmIiwiY2xpZW50U2VjcmV0IjoiYUFkWVZZUkZVcHZucFZ0diJ9.tfOHjdl2mShUP-FS3IrQsv53X-PfPWCkgUkiduR7pAs"

const response = await axios.get(
  "http://4.224.186.213/evaluation-service/notifications",
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }
);
    return response.data.notifications;

  } catch (error) {

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);

    return [];
}
}

function calculateScore(notification) {

  const weight =
    TYPE_WEIGHT[notification.notification_type] || 0;

  const created =
    new Date(notification.createdAt).getTime();

  const recencyScore =
    created / 1000000000000;

  return weight * 1000 + recencyScore;
}

async function main() {

  const notifications =
    await fetchNotifications();

  const heap = new MinHeap();

  for (const notification of notifications) {

    if (notification.isRead) continue;

    notification.score =
      calculateScore(notification);

    heap.insert(notification);

    if (heap.size() > 10) {
      heap.removeMin();
    }
  }

  const top10 =
    heap.getTopNotifications();

  console.log("\nTop 10 Notifications:\n");

  top10.forEach((n, index) => {

    console.log(
      `${index + 1}. ${n.notification_type} - ${n.message}`
    );
  });
}

main();