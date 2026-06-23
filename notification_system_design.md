# Stage 1: Notification System Design

## Objective

Design REST APIs for a notification system that allows users to receive and manage notifications after logging into the application.

## Core Features

The notification system should support the following operations:

1. Create a notification
2. View all notifications of a user
3. View a specific notification
4. Mark a notification as read
5. Mark all notifications as read
6. Delete a notification
7. Get unread notification count
8. Receive real-time notifications

## Base URL

```http
https://api.notificationservice.com/api/v1
```

## Common Request Headers

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
```

---

## 1. Create Notification

### Endpoint

```http
POST /notifications
```

### Request Body

```json
{
  "userId": "USR001",
  "title": "New Message",
  "message": "You have received a new message",
  "type": "MESSAGE",
  "priority": "HIGH"
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created successfully"
}
```

---

## 2. Get All Notifications

### Endpoint

```http
GET /users/{userId}/notifications
```

### Example

```http
GET /users/USR001/notifications?page=1&limit=10
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "notificationId": "NOTIF001",
      "title": "New Message",
      "message": "You have received a new message",
      "isRead": false
    }
  ]
}
```

---

## 3. Get Specific Notification

### Endpoint

```http
GET /notifications/{notificationId}
```

Example:

```http
GET /notifications/NOTIF001
```

---

## 4. Mark Notification as Read

### Endpoint

```http
PATCH /notifications/{notificationId}/read
```

---

## 5. Mark All Notifications as Read

### Endpoint

```http
PATCH /users/{userId}/notifications/read-all
```

---

## 6. Delete Notification

### Endpoint

```http
DELETE /notifications/{notificationId}
```

---

## 7. Get Unread Notification Count

### Endpoint

```http
GET /users/{userId}/notifications/unread-count
```

### Sample Response

```json
{
  "success": true,
  "unreadCount": 5
}
```

---

## Notification Schema

```json
{
  "notificationId": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "type": "MESSAGE | ALERT | SYSTEM",
  "priority": "LOW | MEDIUM | HIGH",
  "isRead": false,
  "createdAt": "datetime"
}
```

---

## Real-Time Notification Mechanism

Real-time notifications can be implemented using **WebSockets**.

### Working

1. User logs into the application.
2. Client establishes a WebSocket connection.
3. When a new notification is generated, the server pushes it to the user instantly.
4. The notification panel gets updated without refreshing the page.

### WebSocket Endpoint

```http
ws://api.notificationservice.com/notifications
```

---

## Error Response Format

```json
{
  "success": false,
  "message": "Notification not found"
}
```
# Stage 2 - Persistent Storage Design

## Recommended Database

I would use **MongoDB** to store notifications.

### Why MongoDB?

* Notifications are stored as JSON documents, so MongoDB is a good fit.
* It supports high write operations.
* Flexible schema allows adding new fields easily.
* Supports scaling using sharding.

## Notification Schema

```json
{
  "_id": "ObjectId",
  "userId": "USR001",
  "title": "New Message",
  "message": "You have received a new message",
  "type": "MESSAGE",
  "priority": "HIGH",
  "isRead": false,
  "createdAt": "2026-06-23T10:30:00Z"
}
```

## Indexes

```javascript
db.notifications.createIndex({ userId: 1, isRead: 1 })
db.notifications.createIndex({ createdAt: -1 })
```

## Possible Problems and Solutions
    Slow queries         -Use indexes                    
    Large amount of data - Use archiving and sharding     
    High read traffic    - Use Redis cache and pagination 


### Get unread notifications

```javascript
db.notifications.find({
  userId: "USR001",
  isRead: false
})
```

### Mark notification as read

```javascript
db.notifications.updateOne(
  { notificationId: "NOTIF001" },
  { $set: { isRead: true } }
)
```

### Get unread count

```javascript
db.notifications.countDocuments({
  userId: "USR001",
  isRead: false
})
```
