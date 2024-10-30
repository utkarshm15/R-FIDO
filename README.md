# R-FIDO (Realtime Face Identification Outlay)

This is a web application that enables payments using face recognition technology. The sender is identified via face recognition, and the payment is sent to the receiver's account by scanning the sender's face using the receiver's device.

## Features

- **Face Recognition**: Utilizes face recognition to identify the sender during a payment transaction.
- **Next.js**: Built using Next.js for both server-side and client-side rendering.
- **PostgreSQL & Prisma**: PostgreSQL is used as the database, with Prisma as the ORM for handling database interactions.
- **Uploadthing**: Handles image uploads for user profiles and facial data.
- **Face-api.js**: Library used for facial recognition functionality.
- **Modern Styling**: Uses Tailwind CSS, ShadCN, and Aeternity UI for building a responsive and visually appealing user interface.

## Tech Stack

- **Next.js**: Frontend framework.
- **PostgreSQL**: Database for storing user and transaction information.
- **Prisma**: ORM to manage the database schema and queries.
- **Uploadthing**: Service for uploading and managing user images.
- **Face-api.js**: JavaScript API for face recognition and detection.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN**: Components that extend Tailwind CSS for UI design.
- **Aeternity UI**: UI components to create a modern and responsive user interface.

## Screenshots

- Landing Page
![landing](./public/screenshots/landing.png)

- Registration Page
![register](./public/screenshots/register.png)

- Login Page
![login](./public/screenshots/login.png)

- Dashboard
![dashboard](./public/screenshots/beforeDashboard.png)

-Face Recognition Screen
![faceRecognition](./public/screenshots/faceRecog.png)

- Payment Screen
![payment](./public/screenshots/paymentScreen.png)

- Updated Balance
![balanceUpdate](./public/screenshots/afterDashboard.png)


## Setup

To run this project locally, follow the instructions below:

### Prerequisites

- **Node.js** and **npm** or **yarn**
- **PostgreSQL** database
- **Uploadthing** account for handling image uploads

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/utkarshm15/R-FIDO.git
   cd R-FIDO
   ```

2. Install the dependencies:
```
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a .env file in the root of the project and add the following:
```
DATABASE_URL="postgresql://username:password@localhost:5432/your-database"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
UPLOADTHING_SECRET="your-uploadthing-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="add_a_secret"
```

4. Run database migrations:
```
npx prisma migrate dev
# or 
pnpm dlx prisma migrate dev
```

5. Start the development server:
```
npm run dev
# or
pnpm dev
```
The application will be available at http://localhost:3000.

# Usage
•	Register as a user and upload an image to use for facial recognition.

•	Create a pin for security of transactions.

•	Add balance to you wallet.

•	Scan your face to send payments to another user.
# Project Structure
•	app/: Contains the Next.js pages and layouts for the web application.

•	prisma/: Includes Prisma schema for the PostgreSQL database.

•	lib/: Contains reusable utility functions and configurations.

•	components/: Reusable UI components for the web app.

•	actions/: Contains server actions.

•	hooks/: Contains custom hooks.

