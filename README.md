## ✅ README final – Version corrigée (commandes Docker avant Kubernetes)

J’ai réorganisé le README pour que la section **Docker** (avec les commandes utiles) précède la section **Kubernetes**.  
Voici le contenu définitif à copier dans `README.md` :

```markdown
# 🚗 Voiture Shop - Application Full Stack

**Application complète de gestion de voitures** avec backend Spring Boot (API REST, JWT, H2, IA), frontend React, containerisation Docker, orchestration Kubernetes (Minikube) et monitoring Prometheus/Grafana.

---

## 📋 Table des matières

- [Vue d’ensemble](#vue-densemble)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Structure du projet](#structure-du-projet)
- [Installation et exécution](#installation-et-exécution)
  - [Option 1 : Docker (recommandé pour test rapide)](#option-1--docker-recommandé-pour-test-rapide)
  - [Option 2 : Développement local (sans Docker)](#option-2--développement-local-sans-docker)
  - [Option 3 : Kubernetes avec Minikube](#option-3--kubernetes-avec-minikube)
- [Authentification JWT](#authentification-jwt)
- [Monitoring Prometheus + Grafana](#monitoring-prometheus--grafana)
- [API Endpoints](#api-endpoints)
- [Tests et vérifications (pour le professeur)](#tests-et-vérifications-pour-le-professeur)
- [Dépannage](#dépannage)

---

## 🎯 Vue d’ensemble

| Fonctionnalité | Statut | Description |
|----------------|--------|-------------|
| CRUD voitures | ✅ | Ajouter, modifier, supprimer, lister |
| Base H2 persistante | ✅ | Mode fichier ou serveur TCP |
| Assistant IA (Ollama) | ✅ | Résumé et questions/réponses (LLaMA2) |
| Authentification JWT | ✅ | Login (`/api/auth/login`), token signé, endpoints protégés |
| Containerisation Docker | ✅ | Images backend + frontend |
| Orchestration Kubernetes | ✅ | Déploiement sur Minikube (3 réplicas backend) |
| Monitoring | ✅ | Prometheus + Grafana (métriques JVM via Micrometer) |

---

## 🛠️ Technologies

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Backend | Spring Boot | 4.0.6 |
| Base de données | H2 | 2.4.240 |
| Authentification | JWT (JJWT) | 0.11.5 |
| Frontend | React | 18 |
| IA | Ollama + LLaMA2 | latest |
| Conteneurisation | Docker | 24+ |
| Orchestration | Kubernetes (Minikube) | v1.28.0 |
| Monitoring | Prometheus, Grafana | latest |

---

## 📦 Prérequis

- **Docker Desktop** (pour les images et Minikube)
- **Minikube** (v1.28.0 recommandé)
- **kubectl** (configuré pour Minikube)
- **Git** (pour cloner)
- **Java 17** (pour exécution locale optionnelle)
- **Node.js 18+** (pour exécution locale optionnelle)

---

## 📁 Structure du projet

```
voiture-shop-fullstack/
├── backend/                 # Spring Boot (JWT, Actuator, H2, IA)
├── frontend/                # React (Login, Axios, IA)
├── k8s/                     # Manifests Kubernetes (h2, backend, frontend)
├── monitoring/              # Fichiers YAML pour Prometheus/Grafana (sans Helm)
├── docker-compose.yml       # Orchestration Docker rapide
└── README.md                # Ce fichier
```

---

## 🚀 Installation et exécution

### Option 1 : Docker (recommandé pour test rapide)

```bash
# Cloner le dépôt
git clone https://github.com/salma12814/voiture-shop-fullstack.git
cd voiture-shop-fullstack

# Démarrer tous les services
docker-compose up -d --build

# Télécharger le modèle IA (première fois, ~15 min)
docker exec -it ollama ollama pull llama2
```

**Accès** :
- Frontend : http://localhost:3001
- API backend : http://localhost:8081/api/voitures (nécessite token JWT)
- Console H2 : http://localhost:8081/h2-console (JDBC URL `jdbc:h2:file:./data/voitureshop`, user `sa`)

**Commandes Docker utiles** :
```bash
docker-compose up -d --build          # Démarrer / reconstruire
docker-compose down                   # Arrêter tous les services
docker-compose logs -f backend        # Voir les logs du backend
docker exec -it ollama ollama pull llama2  # Télécharger le modèle IA
docker exec -it ollama ollama run llama2 "Bonjour"  # Tester l’IA
docker ps                             # Voir les conteneurs actifs
```

### Option 2 : Développement local (sans Docker)

**Backend** :
```bash
cd backend
mvn clean package -DskipTests
mvn spring-boot:run
```

**Frontend** :
```bash
cd frontend
npm install
npm start
```

**IA Ollama** (installer localement) :
```bash
ollama serve
ollama pull llama2
```

### Option 3 : Kubernetes avec Minikube

#### 3.1 Démarrer Minikube
```bash
minikube start --driver=docker --kubernetes-version=v1.28.0 --cpus=2 --memory=4096
```

#### 3.2 Pointer Docker vers Minikube
```bash
@FOR /f "tokens=*" %i IN ('minikube docker-env --shell cmd') DO @%i
```

#### 3.3 Construire les images
```bash
cd backend && docker build -t voiture-backend:latest . && cd ..
cd frontend && docker build -t voiture-frontend:latest . && cd ..
```

#### 3.4 Appliquer les déploiements
```bash
kubectl apply -f k8s/h2-deployment.yaml      # Base H2 (mode serveur)
kubectl apply -f k8s/backend-deployment.yaml # Backend (3 réplicas)
kubectl apply -f k8s/frontend-deployment.yaml
```

#### 3.5 Vérifier les pods
```bash
kubectl get pods -w   # attendre Running (3 backend, 1 frontend, 1 h2)
```

#### 3.6 Accéder à l’application
```bash
# API backend
kubectl port-forward service/backend 8081:8081
# Frontend
kubectl port-forward service/frontend 3001:3001
```

---

## 🔐 Authentification JWT

**Fonctionnement** :
- Endpoint public : `POST /api/auth/login` (body `{ "username":"user", "password":"password" }`)
- Retourne un token JWT.
- Les endpoints `/api/voitures/**` et `/api/ai/**` nécessitent l’en‑tête `Authorization: Bearer <token>`.

**Test avec curl** :
```bash
# Obtenir un token
curl -X POST http://localhost:8081/api/auth/login -H "Content-Type: application/json" -d '{"username":"user","password":"password"}'

# Utiliser le token
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8081/api/voitures
```

**Intégration frontend** :
- `Login.js` stocke le token dans `localStorage`.
- Un intercepteur Axios (dans `App.js`) ajoute automatiquement l’en‑tête `Authorization` à toutes les requêtes.
- Les routes privées (`/list`, `/add`, `/edit/:id`) sont protégées par `PrivateRoute`.

---

## 📊 Monitoring Prometheus + Grafana (sans Helm)

Votre backend expose les métriques sur `/actuator/prometheus`.  
Déployez manuellement :

```bash
kubectl create namespace monitoring
cd monitoring
kubectl apply -f prometheus-config.yaml
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f prometheus-service.yaml
kubectl apply -f grafana-deployment.yaml
kubectl apply -f grafana-service.yaml
cd ..
```

**Accès** :
- Prometheus : `kubectl port-forward svc/prometheus -n monitoring 9090:9090` → http://localhost:9090 (vérifiez **Status → Targets** : la cible `spring-boot-backend` doit être `UP`)
- Grafana : `kubectl port-forward svc/grafana -n monitoring 3002:3000` → http://localhost:3002 (admin/admin)
  - Ajoutez une source de données Prometheus : `http://prometheus:9090`
  - Importez le dashboard Spring Boot : ID `4701` (JVM (Micrometer))

---

## 📡 API Endpoints

| Méthode | Endpoint | Description | Token requis |
|---------|----------|-------------|--------------|
| POST | `/api/auth/login` | Authentification | ❌ |
| GET | `/api/voitures` | Lister toutes les voitures | ✅ |
| GET | `/api/voitures/{id}` | Détail d’une voiture | ✅ |
| POST | `/api/voitures` | Ajouter une voiture | ✅ |
| PUT | `/api/voitures/{id}` | Modifier une voiture | ✅ |
| DELETE | `/api/voitures/{id}` | Supprimer une voiture | ✅ |
| GET | `/api/ai/voitures/{id}/summary` | Résumé IA | ✅ |
| POST | `/api/ai/voitures/{id}/ask` | Question IA | ✅ |

---

## 🧪 Tests et vérifications (pour le professeur)

| Élément | Commande / Action | Résultat attendu |
|---------|-------------------|------------------|
| **Pods** | `kubectl get pods` | 3 backend, 1 frontend, 1 h2 – `Running` |
| **Login JWT** | `curl -X POST .../api/auth/login ...` | Reçoit un token |
| **API protégée** | `curl -H "Authorization: Bearer <TOKEN>" .../api/voitures` | Liste JSON des voitures |
| **Frontend** | `kubectl port-forward service/frontend 3001:3001` → http://localhost:3001 | Page de login, puis liste après authentification |
| **Console H2** | `kubectl port-forward service/h2 8082:8082` → JDBC `jdbc:h2:tcp://h2:1521/voitureshop` | Connexion réussie |
| **Prometheus** | `kubectl port-forward svc/prometheus -n monitoring 9090:9090` → Target `spring-boot-backend` | `UP` |
| **Grafana** | `kubectl port-forward svc/grafana -n monitoring 3002:3000` → Dashboard `4701` | Graphiques JVM |
| **Scaling** | `kubectl scale deployment backend --replicas=5` | 5 pods backend |
| **Auto‑réparation** | `kubectl delete pod <backend-pod>` | Nouveau pod immédiatement créé |

---

## 🔧 Dépannage

| Problème | Solution |
|----------|----------|
| `OPTIONS 403` (CORS) | Vérifiez `@CrossOrigin` dans les contrôleurs (autoriser `http://localhost:3000` et `http://localhost:3001`). |
| `WeakKeyException` | La clé JWT dans `application.properties` doit faire au moins 64 caractères. |
| `Port 8081 déjà utilisé` | `netstat -ano \| findstr :8081` puis `taskkill /f /pid <PID>`. |
| Pod backend ne devient pas `Running` | `kubectl logs deployment/backend` (vérifier clé JWT ou connexion H2). |
| Prometheus cible `DOWN` | Éditez le ConfigMap `prometheus-config` : utilisez `backend.default.svc.cluster.local:8081` comme cible. |
| Grafana ne montre pas de données | Vérifiez que la source de données Prometheus est `http://prometheus:9090` et que la cible est `UP`. |

---

## 👨‍🏫 Remarques pour l’évaluation

- **Authentification JWT** : les endpoints `/api/voitures*` sont protégés – seul `/api/auth/login` est public.
- **CORS** : configuré pour accepter les requêtes depuis `http://localhost:3000` (frontend) et `http://localhost:3001` (fallback).
- **Base H2** : en mode serveur TCP avec volume persistant dans Kubernetes.
- **Monitoring** : Prometheus scrape `/actuator/prometheus` ; Grafana permet de visualiser les métriques JVM.
- **Ollama** : non déployé dans Kubernetes par défaut (peut être ajouté si besoin), mais fonctionne en local ou via Docker.

---

**Le projet est entièrement fonctionnel, sécurisé, containerisé, orchestré et monitoré.  
Merci pour votre évaluation !** 🚀
```

---

Ce README respecte l’ordre demandé : les commandes Docker sont maintenant intégrées directement dans la section **Option 1 : Docker**, juste après l’installation. La partie Kubernetes vient ensuite, dans une section séparée.  
Vous pouvez copier ce bloc dans votre fichier `README.md` et le pousser sur GitHub.
