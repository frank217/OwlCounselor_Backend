# OwlCounselor_backend
Backend Server for OwlCounselor

# Local Development Steps

- Install dependencies
```bash
npm install
```

- Start server
```bash
npm run start
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

* **URL**

  /api/courses

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**

    Name | Type | Description 
    :--- | :---| :---
    major  | String | the major
    degree | Number | the type of degree                   0 - BA, 1 - BS
    sem    | Number | the user's most recently semester    0 - 7

* **Success Response:**
    
  * **Code:** 200 <br />
    **Content:** 
    
    ```json
    {
        "courses": [
            {
                "id": "1001",
                "name": "COMP 140",
            },
            {
                "id": "1002",
                "name": "COMP 182",
            },
            {
                "id": "1003",
                "name": "COMP 215",
            },
        ],
    }
    ```

    <Coordinates of departure and destination.>

    Name | Type | Description 
    :--- | :---| :---
    id   | string | CRN of the class
    name | string | name of the class
 
* **Error Response:**

* **Sample Call:**





## Get Starting Point
* **Description**

* **URL**

  /api/courses

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**

    Name | Type | Description 
    :--- | :---| :---
    major  | String | the major
    degree | Number | the type of degree                   0 - BA, 1 - BS
    sem    | Number | the user's most recently semester    0 - 7
    taken  | array | an array of already taken classes

* **Success Response:**
    
  * **Code:** 200 <br />
    **Content:** 
    
    ```json
    {
        "valid": "true/false",
        "message": "Success/Failure message",
        "courses": [
            {
                "id": "1001",
                "name": "COMP 140",
                "taken": 0,     // -1 = not taken, 0 - 7 semester already taken
                "sems": [0, 1, 2],
            },
            {
                "id": "1002",
                "name": "COMP 182",
                "taken": -1,
                "sems": [1, 3],
            },
            {
                "id": "1003",
                "name": "COMP 215",
                "taken": -1,
                "sems": [2, 4],
            },
        ],
    }
    ```

    <Coordinates of departure and destination.>

    Name | Type | Description 
    :--- | :---| :---
    id   | string | CRN of the class
    name | string | name of the class
    taken| number | the semester the class has been taken in. -1 if not yet taken
    sems | number | the valid semesters to take this class
 
* **Error Response:**

* **Sample Call:**


## Update Bounds
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
    major  | String | the major
    degree | Number | the type of degree                   0 - BA, 1 - BS
    sem    | Number | the user's most recently semester    0 - 7
    taken  | array | an array of already taken classes

    **Content**

    ```json
    {
        "major": "Computer Science",
        "degree": "BS",
        "sem": 4,
        "taken": [
            {
                "id": "1003",
                "name": "COMP 140",
                "taken": 0,
            }
        ]
    }
    ```


* **Success Response:**
    
  **Code:** 200 <br />
**Content:** 

    ```json
    {
            "courses": [
                {
                    "id": "1001",
                    "name": "COMP 140",
                    "taken": 0,     // -1 = not taken, 0 - 7 semester already taken
                    "sems": [0, 1, 2],
                },
                {
                    "id": "1002",
                    "name": "COMP 182",
                    "taken": -1,
                    "sems": [1, 3],
                },
                {
                    "id": "1003",
                    "name": "COMP 215",
                    "taken": -1,
                    "sems": [2, 4],
                },
            ],
        }
    ```

<Coordinates of departure and destination.>

Name | Type | Description 
:--- | :---| :---
valid | boolean | result of validation check

 
* **Error Response:**

* **Sample Call:**

