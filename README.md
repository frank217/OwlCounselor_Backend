# OwlCounselor_backend
Backend Server for OwlCounselor

# Local Development Steps

- Install dependencies
```bash
npm install
```

- Start server
```bash
node app.js
```

# Database Schema

- Course
```javascript
class Course {
    id: String,            
    name: String,
    sem: Number,               // 0 - Fall, 1 - Spring, 2 - Both
    prereq: [[String]],        // List of Course.id
    time: {
        day: (startTime, endTime)
    }
}
```

# API

## Get courses
* **Description**

    Return the estimate data from both Uber and Lyft endpoint.
    This endpoint also supports the upfront fare estimate.

* **URL**

  /api/courses

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

    Name | Type | Description 
    :--- | :---| :---
    null | null | null

* **Success Response:**
    
  * **Code:** 200 <br />
    **Content:** 
    
    ```json
    {
        "courses": [
            {
                "id": "1001",
                "name": "COMP 140",
                "sem": 2,
            },
            {
                "id": "1002",
                "name": "COMP 182",
                "sem": 1,
            },
            {
                "id": "1003",
                "name": "COMP 215",
                "sem": 0,
            },
            
        ],
    }
    ```

    <Coordinates of departure and destination.>

    Name | Type | Description 
    :--- | :---| :---
    id   | string | CRN of the class
    name | string | name of the class
    sem  | number | semester of the class

 
* **Error Response:**

* **Sample Call:**


## Validate Courses
* **Description**

    TODO.

* **URL**

  /api/valid

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**

    Name | Type | Description 
    :--- | :---| :---
    src | array | an array of selected courses
    dst | string | the id of the desired course

    **Content**

    ```json
    {
        "src": ["1001", "1002"],
        "dst": "1003"
    }
    ```


* **Success Response:**
    
  **Code:** 200 <br />
**Content:** 

```json
{
    "valid": true
}
```

<Coordinates of departure and destination.>

Name | Type | Description 
:--- | :---| :---
valid | boolean | result of validation check

 
* **Error Response:**

* **Sample Call:**

