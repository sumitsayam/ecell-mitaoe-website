# E-Cell MITAOE — Kubernetes Production Deployment Guide

## 1. Overview

The `k8s/` directory contains standard Kubernetes resources configured for resilient, zero-downtime production deployment of the E-Cell MITAOE web application.

---

## 2. Manifest Inventory

| File | Resource | Description |
| :--- | :--- | :--- |
| `k8s/deployment.yaml` | `Deployment` | 2-replica rolling deployment with liveness/readiness probes, non-root security context, and resource quotas |
| `k8s/service.yaml` | `Service` | Internal `ClusterIP` load-balancing traffic across active pods on port 80 |
| `k8s/ingress.yaml` | `Ingress` | NGINX Ingress controller routing `ecell.mitaoe.ac.in` with automated Let's Encrypt TLS termination |
| `k8s/kustomization.yaml` | `Kustomization` | Common label injection (`app.kubernetes.io/name: ecell-web`) and multi-resource management |

---

## 3. Deployment Specifications

### Rolling Update Strategy
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```
Guarantees 100% availability during code updates.

### Probes Configuration
- **Readiness Probe**: Queries `GET /` every 10s (initial delay 10s). Pods only receive ingress traffic once ready.
- **Liveness Probe**: Queries `GET /` every 20s (initial delay 15s). Automatically restarts deadlocked instances.

### Resource Limits & Requests
- **CPU Request**: `100m` / **CPU Limit**: `1000m` (1 core)
- **Memory Request**: `256Mi` / **Memory Limit**: `1024Mi` (1 GiB)

---

## 4. Deployment Instructions

### Deploy using Kustomize:
```bash
kubectl apply -k k8s/
```

### Verify Deployment:
```bash
# Check pods status
kubectl get pods -l app=ecell-web

# Check rollout progress
kubectl rollout status deployment/ecell-web-deployment

# View live pod logs
kubectl logs -l app=ecell-web --tail=50 -f
```

### Horizontal Pod Autoscaling (Optional):
```bash
kubectl autoscale deployment ecell-web-deployment --cpu-percent=75 --min=2 --max=10
```

