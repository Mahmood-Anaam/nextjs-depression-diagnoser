# Depression Diagnoser

Depression Diagnoser is an advanced web application designed to assess and diagnose the levels of depression in users. By analyzing user responses and facial expressions, the app provides a personalized evaluation of the user's mental health and offers options for seeking professional help.

## Features

- **User Authentication**: Secure sign-up, sign-in, and password recovery functionality to protect user accounts.
- **Interactive Questionnaire**: Users answer a series of questions designed to evaluate their mental state.
- **Facial Expression Analysis**: Uses face-api.js to detect and analyze facial expressions during the questionnaire.
- **Real-time Speech Recognition**: Users can answer questions using voice commands, with responses recognized and processed instantly.
- **Dynamic Results**: Based on user inputs and expressions, the app calculates and displays the depression level.
- **Consultation Booking**: Users can book consultations with mental health professionals directly through the app.

## Screenshots

- **Home Page**: ![Home Page](link_to_screenshot1)
- **Questionnaire**: ![Questionnaire](link_to_screenshot2)
- **Facial Expression Analysis**: ![Facial Expression Analysis](link_to_screenshot3)
- **Consultation Booking**: ![Consultation Booking](link_to_screenshot4)

## Demo

Try the live version of the app here: [Next.js Depression Diagnoser](https://nextjs-depression-diagnoser.vercel.app)

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Mahmood-Anaam/nextjs-depression-diagnoser.git
cd nextjs-depression-diagnoser
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory and add the following environment variables:

```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be running on `http://localhost:3000`.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Prisma**: A modern ORM for database interaction in Node.js.
- **Face-api.js**: A library for face detection and facial expression recognition.
- **React Speech Recognition**: A library for integrating speech recognition into React apps.
- **Nodemailer**: A Node.js module for sending emails.

## Environment Variables

- `DATABASE_URL`: Connection string for the PostgreSQL database.
- `JWT_SECRET`: Secret key for JWT authentication.
- `NODE_ENV`: Defines the environment (development or production).
- `SMTP_HOST`: Hostname of the SMTP server for sending emails.
- `SMTP_PORT`: Port used by the SMTP server.
- `SMTP_USER`: Username for SMTP authentication.
- `SMTP_PASS`: Password for SMTP authentication.

## License

This project is licensed under the MIT License.

