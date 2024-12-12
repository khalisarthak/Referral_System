System Architecture Overview

    1. System Components
        The system is built with a combination of a backend REST API (Node.js/Express), a frontend application (React), and WebSocket integration for real-time notifications. It allows users to make purchases, receive earnings based on a referral system, and view purchase and earnings data. The system also includes a WebSocket server for pushing notifications to the user regarding earnings.


    2. Technologies Used
        - Backend: Node.js, Express.js, Sequelize (for database interactions)
        - Frontend: React.js
        - Database: MySQL (using Sequelize as an ORM)
        - WebSocket: Socket.io for real-time notifications
        - Authentication: JWT (JSON Web Token)
        - Version Control: Git (GitHub or GitLab)
    3. System Flow
        User Registration & Authentication: Users can sign up and log in. JWT is used for authentication and maintaining user sessions.
        Purchase Process: Users can make purchases, and based on their referral status, earnings are distributed to the parent users.
        Real-Time Notifications: Whenever earnings are updated due to a purchase, the user’s parent receives a WebSocket notification.
        Purchase & Earnings Tracking: The system stores purchase data and earnings for each user, which can be retrieved and displayed.


API Documentation

    1. Purchase API
        Endpoint: POST /api/purchase
        Method: POST
        Description: This endpoint processes a purchase made by the user, calculates earnings for the referred users (if applicable), and stores purchase data in the database.
        Request Body:
        
            {
            "userId": "integer",           // ID of the user making the purchase
            "purchaseAmount": "float"      // Amount of the purchase
            }
            Response:
            Success (200 OK):
        
                {
                "message": "Purchase processed successfully"
                }
            Failure (400 or 500):
            
                {
                "message": "Error message"
                }


    2. Get Purchase Details API
        Endpoint: GET /api/getPurchaseDetails/:userId
        Method: GET
        Description: This endpoint retrieves all the purchase details made by the specified user.
        Response:
            Success (200 OK):

                [
                {
                    "id": "integer",
                    "userId": "integer",
                    "purchaseAmount": "float",
                    "createdAt": "timestamp",
                    "updatedAt": "timestamp"
                },
                ...
                ]

            Failure:

                {
                "message": "Error fetching purchase details"
                }

    3. Get Earning Details API

        Endpoint: GET /api/getEarningDetails/:userId
        Method: GET
        Description: This endpoint retrieves the earnings details of a user, including both direct and indirect earnings.
        Response:
            Success (200 OK):
            [
            {
                "id": "integer",
                "userId": "integer",
                "referredUserId": "integer",
                "purchaseAmount": "float",
                "directEarnings": "float",
                "indirectEarnings": "float",
                "createdAt": "timestamp",
                "updatedAt": "timestamp"
            },
            ...
            ]

        Failure:
        
            {
            "message": "Error fetching earning details"
            }
