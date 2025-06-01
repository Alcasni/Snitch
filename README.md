# 🛡️ MyPro – PDPA Privacy Assistant for Singapore

**Take back control of your personal data.**  
MyPro is a simple, login-free tool that helps Singapore residents discover who may be holding their data, generate PDPA-compliant DSARs, and learn how to protect their privacy.

---

## 📄 Project Description

Most people don’t know that dozens of companies collect their personal data—and they have the right to ask for it back.
**MyPro** empowers users to identify these companies and take action through PDPA-based data access requests, all without requiring an account or storing any user data. It also offers educational tools and community stories to raise awareness. It’s a small but powerful step toward owning your digital identity.”

---

## 🖼️ Screenshot / Wireframe

![Wireframe](https://www.figma.com/design/uw4x1J8c7v2PgtWWqAZt1V/MyPro?node-id=1-703&t=5cYRUrPZ6d8ykEWk-0)  

---

##  MVP Features

- **Company Search** – Users can input their email or company name to see who might hold their data.
- **DSAR Generator** – Generate personalized Data Subject Access Requests for PDPA compliance.
- **Info Hub** – Learn what PDPA is, how scams work, and why your data matters.
- **Community Page** – See real-world cases, interviews, and monthly updates on data privacy issues.
- **No Login or Tracking** – Fully anonymous use; nothing is stored on our servers.

---

## 🛠️ Tech Stack

| Layer     | Tech                 |
|-----------|----------------------|
| Frontend  | Next.js, Tailwind CSS |
| Backend   | Flask (Python)       |
| Deployment| Vercel (frontend), Render (backend) |
| Data      | Static DSAR templates, no DB used |

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- npm or yarn

### Frontend

```bash
cd frontend
npm install
npm run dev
