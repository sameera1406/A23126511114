const notifications = [
  {
    id: 1,
    title: "TCS Hiring",
    message: "TCS drive starts tomorrow",
    type: "Placement",
    createdAt: "2026-06-23",
  },
  {
    id: 2,
    title: "Semester Result",
    message: "Results released",
    type: "Result",
    createdAt: "2026-06-22",
  },
  {
    id: 3,
    title: "AI Workshop",
    message: "Workshop this weekend",
    type: "Event",
    createdAt: "2026-06-21",
  },
  {
    id: 4,
    title: "Amazon Internship",
    message: "Applications open",
    type: "Placement",
    createdAt: "2026-06-24",
  }
];

export const fetchNotifications = () => {
  return Promise.resolve(notifications);
};