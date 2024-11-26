# Layne Chen Portfolio 2024

A modern portfolio website showcasing my work as a front-end developer and 3D enthusiast. Built with Next.js, Three.js, and GSAP, featuring WebGL experiences and optimal performance.

![Portfolio Preview](/public/dom/project-preview-layne-chen-portfolio-2024.webp)

## 🌟 Features

-   **Modern Stack**: Built with Next.js, TypeScript, and Tailwind CSS
-   **3D Graphics**: Powered by Three.js with custom shaders
-   **Smooth Animations**: Implemented using GSAP
-   **Optimal Performance**: Static Site Generation (SSG) for fast load times
-   **Responsive Design**: Fully responsive across all devices
-   **SEO Optimized**: Enhanced meta tags and static generation

## 🛠️ Tech Stack

### Frontend

-   TypeScript
-   Next.js
-   Three.js
-   GLSL
-   GSAP
-   Tailwind CSS
-   Zustand (State Management)

## 🌐 Deployment

-   **Hosting**: Amazon S3
-   **CDN and Security**: Integrated with Amazon CloudFront for Content Delivery and HTTPS
-   **Domain Management**: Managed via Amazon Route 53
-   **Deployment Process**: CI/CD using GitHub Actions for automatic S3 bucket updates and CloudFront cache invalidation

### Deployment Workflow with GitHub Actions

This project utilizes **GitHub Actions** for automated deployment. Whenever changes are pushed to the `main` branch, the deployment workflow is triggered, ensuring that the latest code is built and synced with the Amazon S3 bucket.

Below is a summary of the deployment workflow:

1. **Checkout the Code**: GitHub Actions checks out the latest version of the code.
2. **Setup Node.js**: Installs the necessary Node.js environment.
3. **Install Dependencies**: Runs `npm install` to install all required dependencies.
4. **Build Project**: Runs `npm run build` to build the project.
5. **Post-Build Optimization**: Executes post-build optimization scripts.
6. **Sync to S3**: Uses the AWS CLI to sync the built files to the S3 bucket, ensuring the latest version is deployed.
