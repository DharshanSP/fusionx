# 🚀 FusionX: The Serverless Multimodal AI Assistant

[![Live Demo](https://img.shields.io/badge/Live_Demo-fusion--iota--green.vercel.app-6366f1?style=for-the-badge&logo=vercel)](https://fusion-iota-green.vercel.app)
[![AWS](https://img.shields.io/badge/Powered_by-AWS_Serverless-FF9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/Frontend-React_%2B_Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

**FusionX** is an enterprise-grade, fully serverless AI command center built to solve **Problem Statement 16**. It seamlessly integrates multimodal AWS AI services (Computer Vision + Generative AI) into a unified, zero-overhead pipeline. 

Instead of juggling multiple tools, users can drop **any combination of files** (Images, PDFs, Documents, Text) into FusionX and instantly extract insights, compare documents, and trigger AI actions.

---

## 🎯 The Problem Solved (PS 16)
**Objective:** *Utilize applied ML with NLP and computer vision APIs via serverless architecture to integrate multimodal AI functionalities seamlessly.*

FusionX solves this by utilizing **AWS Lambda** as an intelligent orchestrator. It dynamically parses incoming S3 files and routes them simultaneously to **Amazon Rekognition** and **Amazon Bedrock (Nova Lite)**, providing a frictionless user experience with zero idle compute costs.

---

## ✨ "Wow-Factor" Features

* 🧠 **Multi-Document Comparison:** Upload multiple PDFs or images at once. FusionX natively analyzes all of them and extracts key differences and similarities.
* 💡 **Contextual Smart Prompts:** Zero-touch UX. The UI detects the file types you upload and instantly generates glowing smart-suggestion buttons (e.g., "Summarize Document" vs. "Describe Image").
* 💻 **AI Action Triggers:** When you ask FusionX to write code, it detects the output and renders a beautiful, syntax-highlighted code editor with a one-click **Copy to Clipboard** button.
* 📥 **Export to Report:** Solves real business needs. One-click download packages the AI's analysis into a clean text report.
* 🔊 **Accessibility (Text-to-Speech):** A native Read Aloud feature that speaks the AI's response to you.
* ⌨️ **Simulated Streaming:** A custom "ChatGPT-style" typing effect that brings the AI to life.

---

## 🏗️ System Architecture

FusionX is a **100% Serverless Architecture**:

1. **Client Layer:** React.js + TailwindCSS with glassmorphism aesthetics.
2. **Storage Layer:** Browser-to-S3 direct uploads.
3. **API Layer:** Amazon API Gateway (secured via Custom API Keys).
4. **Compute Layer:** AWS Lambda (Python 3.12).
5. **AI/ML Layer:** 
    * **Amazon Rekognition:** For high-speed object detection and labeling.
    * **Amazon Bedrock (Nova Lite):** For deep, multimodal generative AI reasoning.

---

## 💻 Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Lucide React
* **Backend:** AWS Lambda, API Gateway
* **Storage:** Amazon S3
* **AI Models:** Amazon Nova Lite v1, Amazon Rekognition
* **Deployment:** Vercel

---

## 🚀 Running Locally

If you want to run the frontend on your local machine:

1. Clone the repository:
   ```bash
   git clone[ https://github.com/yourusername/FusionX.git](https://github.com/DharshanSP/fusionx.git)
   cd FusionX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

> **Note:** The backend is fully deployed on AWS, so the local React app will connect to the live AI pipeline instantly!

---

*Built with ❤️ for the Hackathon.*
