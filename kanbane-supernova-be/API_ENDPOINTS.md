# Kanbane Supernova Backend API Endpoints

This document describes all available API endpoints for the Kanbane Supernova backend application.

## Base URL

```
http://localhost:3004
```

## Tasks Endpoints

### GET /tasks

Retrieve all tasks

- **Response**: Array of task objects
- **Example Response**:

```json
[
  {
    "id": "p-001",
    "name": "Angular Components",
    "columnId": "1",
    "definition": "The building blocks of Angular applications that control a part of the UI.",
    "links": ["https://angular.dev/guide/components"]
  }
]
```

### GET /tasks/:id

Retrieve a specific task by ID

- **Parameters**: `id` (string) - Task ID
- **Response**: Task object or error message

### POST /tasks

Create a new task

- **Body**:

```json
{
  "name": "Task Name",
  "columnId": "1",
  "definition": "Task description",
  "links": ["https://example.com"]
}
```

- **Response**: Updated array of all tasks

### PATCH /tasks/:id

Update a task

- **Parameters**: `id` (string) - Task ID
- **Body**:

```json
{
  "data": {
    "name": "Updated Task Name",
    "definition": "Updated description"
  }
}
```

- **Response**: Success status and updated task

### DELETE /tasks/:id

Delete a task

- **Parameters**: `id` (string) - Task ID
- **Response**: Success status and deleted task

## Columns Endpoints

### GET /columns

Retrieve all columns

- **Response**: Array of column objects
- **Example Response**:

```json
[
  {
    "id": "1",
    "title": "First",
    "icon": "pi-asterisk",
    "iconColor": "#FF6F61"
  }
]
```

### GET /columns/:id

Retrieve a specific column by ID

- **Parameters**: `id` (string) - Column ID
- **Response**: Column object or error message

### POST /columns

Create a new column

- **Body**:

```json
{
  "title": "Column Title",
  "icon": "pi-icon",
  "iconColor": "#000000"
}
```

- **Response**: Created column object

### PATCH /columns/:id

Update a column

- **Parameters**: `id` (string) - Column ID
- **Body**:

```json
{
  "title": "Updated Title",
  "iconColor": "#ffffff"
}
```

- **Response**: Updated column object

### DELETE /columns/:id

Delete a column

- **Parameters**: `id` (string) - Column ID
- **Response**: Success status and deleted column

## Labels Endpoints

### GET /labels

Retrieve all labels

- **Response**: Array of label objects
- **Example Response**:

```json
[
  {
    "id": "1",
    "label": "JavaScript",
    "value": "javascript",
    "color": "#f7df1e",
    "icon": "pi pi-code"
  }
]
```

### GET /labels/:id

Retrieve a specific label by ID

- **Parameters**: `id` (string) - Label ID
- **Response**: Label object or error message

### POST /labels

Create a new label

- **Body**:

```json
{
  "label": "Label Name",
  "value": "label-value",
  "color": "#000000",
  "icon": "pi pi-tag"
}
```

- **Response**: Updated array of all labels

### PATCH /labels/:id

Update a label

- **Parameters**: `id` (string) - Label ID
- **Body**:

```json
{
  "data": {
    "label": "Updated Label",
    "color": "#ffffff"
  }
}
```

- **Response**: Success status and updated label

### DELETE /labels/:id

Delete a label

- **Parameters**: `id` (string) - Label ID
- **Response**: Success status and deleted label

## Predefined Labels

The system comes with 11 predefined labels:

1. **JavaScript** - `javascript` - `#f7df1e` - `pi pi-code`
2. **TypeScript** - `typescript` - `#3178c6` - `pi pi-code`
3. **Angular** - `angular` - `#dd0031` - `pi pi-cog`
4. **Backend** - `backend` - `#68217a` - `pi pi-server`
5. **Frontend** - `frontend` - `#61dafb` - `pi pi-desktop`
6. **Database** - `database` - `#336791` - `pi pi-database`
7. **Design** - `design` - `#ff7c43` - `pi pi-palette`
8. **Testing** - `testing` - `#25c2a0` - `pi pi-check-circle`
9. **Urgent** - `urgent` - `#e74c3c` - `pi pi-exclamation-triangle`
10. **Easy** - `easy` - `#2ecc71` - `pi pi-thumbs-up`
11. **Hard** - `hard` - `#e67e22` - `pi pi-star`

## Predefined Columns

The system comes with 3 predefined columns:

1. **First** - `pi-asterisk` - `#FF6F61`
2. **Second** - `pi-clock` - `#4D96FF`
3. **Third** - `pi-crown` - `#F5B700`

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Success Responses

Update and delete operations return:

```json
{
  "success": true,
  "task|column|label": {
    /* updated/deleted object */
  }
}
```

## CORS Configuration

The API supports CORS for the following origins:

- `http://localhost:4200`
- `http://localhost:51448`

## Data Validation

- **Task names**: Minimum 5 characters
- **Task definitions**: Minimum 50 characters
- **Column titles**: Minimum 3 characters
- **Label names and values**: Minimum 2 characters
- **URLs in task links**: Must be valid URLs
