#Stage 1:Notification-System-Design

##Objective
Design REST APIs for a notification platform that allows users to recieve and manage notifications while logged in.\

#Core Action Supported
the Notification System Should support the following Actions:
1.create a Notification
2.get All the Notifications for a User 
3.get a specific notification
4.mark notification as read
5.Mark all notifications as Read
6.delete a notification
7.get unread notification count
8.recieve real-time notifications

#Bas-URL

https://api.notificationservice.com/api/v1

#common headers

##Request Header

```http
Content-Type:application/json
Accept:Application/json
Authorization:Bearer <token>
```
#1.Create Notification

##EndPoint

```http
POST/notifications
```

##Request Body

```json
{
    "userId":"USR001",
    "Title":"New Message",
    "Message":"you have recieved a new Message",
    "Type":"MESSAGE",
    "Priority":"HIGH"
}
```
##Success Response
```http
201 Created
```
```json
{
    "success":true,
    "message":"notification created Successfully",
    "data":{
        "notificationId":"NOTIF001",
        "userId":"USR001",
        "Title":"New Message",
        "Message":"you have recieved a new Message",
        "Type":"MESSAGE",
        "Priority":"HIGH",
        "isRead":"false,
        "createdAt":"2026-06-23T10:30:00Z"
    }
}
```
#2.Get All Notifications
##endPoint
```http
GET /users/{userId}/notifications
```
##Example
```http
GET /users/USR001/notifications
```
##Query Parameters
```http
?page=1&limit=10&status=unread
```
##Success Response
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "notificationId": "NOTIF001",
      "title": "New Message",
      "message": "You have received a new message.",
      "isRead": false,
      "createdAt": "2026-06-23T10:30:00Z"
    },
    {
      "notificationId": "NOTIF002",
      "title": "Order Shipped",
      "message": "Your order has been shipped.",
      "isRead": true,
      "createdAt": "2026-06-22T08:00:00Z"
    }
  ]
}
```

---

# 3. Get Specific Notification

## Endpoint

```http
GET /notifications/{notificationId}
```

## Example

```http
GET /notifications/NOTIF001
```

## Success Response

```json
{
  "success": true,
  "data": {
    "notificationId": "NOTIF001",
    "title": "New Message",
    "message": "You have received a new message.",
    "type": "MESSAGE",
    "priority": "HIGH",
    "isRead": false,
    "createdAt": "2026-06-23T10:30:00Z"
  }
}
```

---

# 4. Mark Notification as Read

## Endpoint

```http
PATCH /notifications/{notificationId}/read
```

## Example

```http
PATCH /notifications/NOTIF001/read
```

## Success Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# 5. Mark All Notifications as Read

## Endpoint

```http
PATCH /users/{userId}/notifications/read-all
```

## Example

```http
PATCH /users/USR001/notifications/read-all
```

## Success Response

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

# 6. Delete Notification

## Endpoint

```http
DELETE /notifications/{notificationId}
```

## Example

```http
DELETE /notifications/NOTIF001
```

## Success Response

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

# 7. Get Unread Notification Count

## Endpoint

```http
GET /users/{userId}/notifications/unread-count
```

## Example

```http
GET /users/USR001/notifications/unread-count
```

## Success Response

```json
{
  "success": true,
  "unreadCount": 5
}
```

---

# Notification JSON Schema

```json
{
  "notificationId": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "type": "MESSAGE | ORDER | ALERT | SYSTEM",
  "priority": "LOW | MEDIUM | HIGH",
  "isRead": "boolean",
  "createdAt": "datetime"
}
```

---

# Real-Time Notification Mechanism

The notification system should support real-time updates using **WebSockets**.

## Workflow

1. User logs into the application.
2. Client establishes a WebSocket connection with the server.
3. When a new notification is generated, the server immediately pushes the notification to the connected user.
4. The client updates the notification panel without refreshing the page.

## WebSocket Endpoint

```http
ws://api.notificationservice.com/notifications
```

## Sample Real-Time Event

```json
{
  "event": "NEW_NOTIFICATION",
  "data": {
    "notificationId": "NOTIF010",
    "title": "Payment Successful",
    "message": "Your payment has been processed."
  }
}
```

---

# Error Response Format

```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Notification not found"
  }
}
```