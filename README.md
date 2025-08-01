#  End-to-End 3-Tier Application CI/CD with Kubernetes, AWS EKS, Jenkins & Argo CD (GitOps)

This project implements a robust CI/CD pipeline for a 3-tier application using **Jenkins**, **AWS EKS**, and **Argo CD**. It separates **backend** and **frontend** workflows and automates every phase from code analysis to GitOps-based deployment.

---

## ✅ Features

- Independent pipelines for **backend** and **frontend**
- GitOps-powered deployments with Argo CD
- Automated static code analysis using **SonarQube**
- Dependency scanning with **OWASP Dependency-Check**
- Vulnerability scanning via **Trivy**
- Docker image publishing to **Amazon ECR**
- Auto-update of Kubernetes manifests on successful builds
- Continuous delivery via Argo CD to **AWS EKS**

---

## ⚙️ Prerequisites

### Jenkins Requirements

Ensure Jenkins is configured with:

- **Plugins**:
  - Docker
  - SonarQube Scanner
  - OWASP Dependency-Check

- **Installed Tools**:
  - AWS CLI
  - Trivy CLI

- **Credentials & Access**:
  - AWS credentials with ECR access
  - GitHub access token
  - SonarQube server and token

### Argo CD Requirements

- Argo CD installed and running in the Kubernetes cluster
- Proper access configured to monitor your Git repository
- Applications created and configured to apply manifests to the EKS cluster

---

## 🔐 Jenkins Environment Variables

These environment variables and credentials should be configured in Jenkins:

| Variable             | Description                                |
|----------------------|--------------------------------------------|
| `SONARQUBE_ENV`      | Jenkins SonarQube configuration name       |
| `AWS_ACCOUNT_ID`     | AWS account ID                             |
| `AWS_ECR_REPO_NAME`  | ECR repository names                       |
| `AWS_DEFAULT_REGION` | AWS region                                 |
| `ECR_REPO_URL`       | Complete ECR repository URL                |
| `GITHUB`             | GitHub credentials ID in Jenkins           |
| `sonar-token`        | SonarQube authentication token credentials |

---

## 🧪 Pipeline Flow

Each app tier (`backend` and `frontend`) follows this pipeline:

1. **Code Quality Analysis** – using SonarQube
2. **Dependency Security Scan** – with OWASP Dependency-Check
3. **Trivy file Scan** – for filesystem analysis 
4. **Docker Build & Push** – image tagged and pushed to ECR
5. **Trivy image Scan** – for Docker image vulnerabilities
5. **Kubernetes Manifest Update** – deployment YAML updated with new tag
6. **Argo CD Sync** – deployment triggered to EKS automatically via GitOps


Database

- Deployed as a **Kubernetes StatefulSet** for persistent storage
- No build pipeline, configured manualy in ArgoCD
---

## 🛠️ Usage

- Pipelines support both **manual** and **automated** triggers.
- Backend and frontend can build and deploy **in parallel**.
- Kubernetes deployments always point to the **latest image**.
- Argo CD ensures **cluster state matches Git** automatically.
- StatefulSet changes are also GitOps-managed

---

## 🎯 Customization Tips

- **Security Rules**: Tune SonarQube and Trivy policies for stricter or more lenient scanning.
- **Quality Gates**: Set `abortPipeline: true` to fail builds on SonarQube quality gate failure.
- **Approval Gates**: Add manual approvals for production releases if required.
- **Argo CD Policies**: Modify sync strategy (`auto`, `manual`, `hook-based`) as needed.
- **Prometheuse and Grafana**: Set up and configure Prometheus and Grafana for montoring

---

## 🧩 Troubleshooting

- ✅ Ensure all Jenkins credentials and tools are correctly configured.
- 🔍 Verify Jenkins agents have access to SonarQube, GitHub, and ECR.
- 🔁 Check Argo CD is properly syncing with the Git repository.
- 🔐 Ensure Argo CD and Jenkins have necessary Kubernetes access.

---

## 📦 Tech Stack

- **CI/CD**: Jenkins
- **GitOps Deployment**: Argo CD
- **Registry**: Amazon ECR
- **Static Analysis**: SonarQube
- **Dependency Scanning**: OWASP Dependency-Check
- **Container Scanning**: Trivy
- **Platform**: Kubernetes on AWS EKS

---





