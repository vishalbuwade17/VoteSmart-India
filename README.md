# 🗳️ VoteSmart India

**VoteSmart India** is a modern, interactive platform designed to empower and educate Indian voters. It combines engaging educational tools like interactive quizzes and flashcards with a state-of-the-art AI assistant to simplify the electoral process.

---

## ✨ Key Features

-   **🤖 Gemini AI Election Bot**: A context-aware assistant to answer questions about polling stations, candidate details, and voting procedures.
-   **📝 Interactive Quizzes**: Test your knowledge about the Indian democratic system with real-time feedback and animations.
-   **🗂️ Educational Flashcards**: Learn complex electoral concepts through a sleek, flip-card interface.
-   **📊 Dynamic Insights**: Visualized data using Chart.js to help voters understand trends.
-   **🚀 Premium UX**: Built with Framer Motion and Tailwind CSS for smooth, high-end transitions and responsiveness.

---

## 🛠️ Tech Stack

### Frontend
-   **Core**: React 18 + Vite
-   **Styling**: Tailwind CSS + Framer Motion
-   **Icons & Assets**: Lucide React + Lottie
-   **State & API**: Axios + React Router

### Backend
-   **Runtime**: Node.js (Express)
-   **AI Integration**: Google Gemini API (`@google/generative-ai`)
-   **Security**: Helmet, Express Rate Limit, CORS
-   **Logging**: Winston

---

## 🚀 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/VoteSmart-India.git
    cd VoteSmart-India
    ```

2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` folder:
    ```env
    GEMINI_API_KEY=your_api_key_here
    PORT=8080
    ```

3.  **Setup Frontend**:
    ```bash
    cd ../frontend
    npm install
    ```

### Running Locally

-   **Backend**: `cd backend && npm run dev`
-   **Frontend**: `cd frontend && npm run dev`

---

## 🧪 Testing

-   **Frontend**: `npm run test` (Vitest)
-   **Backend**: `npm run test` (Jest)

---

## 🛡️ Security & Performance
-   **Rate Limiting**: Prevents API abuse.
-   **Content Security Policy**: Implemented via Helmet.
-   **Gzip Compression**: Optimized for fast asset delivery.
-   **Dockerized**: Production-ready `Dockerfile` included for Google Cloud Run deployment.
