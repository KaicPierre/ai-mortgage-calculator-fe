# AI Mortgage Calculator - Frontend

A modern React-based chat interface for an AI-powered mortgage calculator assistant. This frontend application provides a conversational UI where users can interact with an AI to calculate mortgage simulations with a human-in-the-loop approval pattern.

## 🎯 Overview

This project is a take-home test demonstrating a chat-based mortgage calculator with the following key features:

- **Conversational Interface**: Users interact with an AI assistant through a chat interface
- **Human-in-the-Loop Pattern**: Before running mortgage calculations, the AI requests user approval, displaying all simulation parameters for review
- **Real-time Feedback**: Loading states and error handling for a smooth user experience

## 🏗️ Architecture

### Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

### Project Structure

```
ai-mortgage-calculator-fe/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── ApprovalModal.tsx # Modal for approving/denying simulations
│   │   ├── ChatHeader.tsx    # Chat header with AI avatar
│   │   ├── ChatInput.tsx     # Message input field and send button
│   │   ├── ChatMessage.tsx   # Individual message bubble
│   │   ├── ChatMessages.tsx  # Messages container
│   │   └── index.ts          # Barrel exports
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main chat page
│   └── repository.ts         # API communication layer
├── tests/
│   ├── components/           # Component unit tests
│   │   ├── ApprovalModal.test.tsx
│   │   ├── ChatHeader.test.tsx
│   │   ├── ChatInput.test.tsx
│   │   ├── ChatMessage.test.tsx
│   │   └── ChatMessages.test.tsx
│   └── setup.ts              # Test setup configuration
├── vitest.config.ts          # Vitest configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Home (page.tsx)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                   ChatHeader                      │  │
│  │  [AI Avatar] Mortgage Assistant - Online          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                  ChatMessages                     │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │              ChatMessage (model)            │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                    ┌─────────────────────────────┐│  │
│  │                    │    ChatMessage (user)       ││  │
│  │                    └─────────────────────────────┘│  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    ChatInput                      │  │
│  │  [Input Field........................] [Send]     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   ApprovalModal                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Simulation Approval Required              │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  Home Price:     $500,000                         │  │
│  │  Down Payment:   $100,000                         │  │
│  │  Interest Rate:  6.5%                             │  │
│  │  Loan Term:      30 years                         │  │
│  │  ZIP Code:       90210                            │  │
│  ├───────────────────────────────────────────────────┤  │
│  │           [Deny]            [Approve]             │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
┌──────────┐     sendMessage()      ┌────────────────┐     POST /chat      ┌─────────┐
│   User   │ ────────────────────▶  │ ChatRepository │ ──────────────────▶ │ Backend │
└──────────┘                        └────────────────┘                     └─────────┘
     │                                      │                                    │
     │                                      │◀───────────────────────────────────┘
     │                                      │  { response, requiresApproval,
     │                                      │    pendingCalculation }
     │                                      │
     │  if requiresApproval: true           │
     │◀─────────────────────────────────────┘
     │  Show ApprovalModal
     │
     │  User clicks Approve/Deny
     │ ─────────────────────────────────────▶
     │                                      │     sendApproval()
     │                                      │ ──────────────────────────────────▶
     │                                      │◀──────────────────────────────────
     │◀─────────────────────────────────────┘
     │  Display final response
```

### Repository Pattern

The `repository.ts` file implements a singleton pattern for API communication:

- **`sendMessage(message)`**: Sends user messages to the backend. Returns response with optional `requiresApproval` flag and `pendingCalculation` data
- **`sendApproval(approved)`**: Sends user approval/denial for pending calculations
- **Session Management**: Maintains `sessionId` across requests for conversation continuity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see [ai-mortgage-calculator](https://github.com/KaicPierre/ai-mortgage-calculator))

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:KaicPierre/ai-mortgage-calculator-fe.git
   cd ai-mortgage-calculator-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend** (in a separate terminal)
   
   Follow the instructions in the [backend repository](https://github.com/KaicPierre/ai-mortgage-calculator) to start the API server on `http://localhost:5000`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 🧪 Testing

The project uses **Vitest** with **React Testing Library** for unit testing. All components have **100% test coverage**.

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |     100 |      100 |     100 |     100 |
 ApprovalModal.tsx |     100 |      100 |     100 |     100 |
 ChatHeader.tsx    |     100 |      100 |     100 |     100 |
 ChatInput.tsx     |     100 |      100 |     100 |     100 |
 ChatMessage.tsx   |     100 |      100 |     100 |     100 |
 ChatMessages.tsx  |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|
```

## 🔧 Configuration

### API Base URL

The backend API URL is configured in `app/repository.ts`:

```typescript
const API_BASE_URL = "http://localhost:5000";
```

To change the API endpoint, modify this constant or implement environment variable support.

## 📝 Human-in-the-Loop Pattern

This application implements a human-in-the-loop approval flow:

1. User requests a mortgage calculation through the chat
2. AI extracts parameters and returns `requiresApproval: true` with `pendingCalculation` data
3. Frontend displays the **ApprovalModal** with all calculation parameters
4. User reviews and clicks **Approve** or **Deny**
5. Frontend sends approval decision to backend
6. Backend runs (or skips) the calculation and returns the final response

This pattern ensures users have full control over what calculations are executed with their data.

## 🔗 Related Repository

- **Backend**: [ai-mortgage-calculator](https://github.com/KaicPierre/ai-mortgage-calculator) - Typescript backend
