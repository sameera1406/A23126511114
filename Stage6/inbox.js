// with mock data
async function inbox() {

  return [
    {
      id: 1,
      notification_type: "Placement",
      message: "TCS hiring drive starts tomorrow",
      createdAt: "2026-06-23T10:30:00Z",
      isRead: false
    },
    {
      id: 2,
      notification_type: "Result",
      message: "Semester 6 results announced",
      createdAt: "2026-06-22T08:00:00Z",
      isRead: false
    },
    {
      id: 3,
      notification_type: "Event",
      message: "AI workshop this weekend",
      createdAt: "2026-06-20T09:00:00Z",
      isRead: false
    },
    {
      id: 4,
      notification_type: "Placement",
      message: "Infosys registration deadline today",
      createdAt: "2026-06-24T07:30:00Z",
      isRead: false
    },
    {
      id: 5,
      notification_type: "Event",
      message: "College fest registrations open",
      createdAt: "2026-06-19T11:00:00Z",
      isRead: true
    },
    {
      id: 6,
      notification_type: "Result",
      message: "Internal marks uploaded",
      createdAt: "2026-06-23T15:45:00Z",
      isRead: false
    },
    {
      id: 7,
      notification_type: "Placement",
      message: "Wipro aptitude test scheduled",
      createdAt: "2026-06-21T14:20:00Z",
      isRead: false
    },
    {
      id: 8,
      notification_type: "Event",
      message: "Hackathon registrations closing soon",
      createdAt: "2026-06-24T06:00:00Z",
      isRead: false
    },
    {
      id: 9,
      notification_type: "Placement",
      message: "Accenture interview shortlist released",
      createdAt: "2026-06-24T09:00:00Z",
      isRead: false
    },
    {
      id: 10,
      notification_type: "Result",
      message: "Assignment grades published",
      createdAt: "2026-06-22T13:00:00Z",
      isRead: false
    },
  ];
}
async function main() {
  const notifications = await inbox();

  console.log("Notifications:\n");

  notifications.forEach((n, index) => {
    console.log(
      `${index + 1}. ${n.notification_type} - ${n.message}`
    );
  });
}

main();