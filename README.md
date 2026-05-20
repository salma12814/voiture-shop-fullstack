# 🚗 Voiture Shop - Application Full Stack

**Une application complète de gestion de voitures avec backend Spring Boot, frontend React, base de données H2 et Intelligence Artificielle (Ollama).**

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation rapide](#-installation-rapide)
- [Guide d'utilisation](#-guide-dutilisation)
- [Tests et vérifications](#-tests-et-vérifications)
- [API Endpoints](#-api-endpoints)
- [Commandes Docker](#-commandes-docker)
- [Structure du projet](#-structure-du-projet)
- [Dépannage](#-dépannage)
- [Contribution](#-contribution)

---

## 👀 Vue d'ensemble

**Voiture Shop** est une application web full stack permettant de :

✅ **Gérer un inventaire de voitures** - Ajouter, modifier, supprimer et lister les véhicules  
✅ **Interface utilisateur intuitive** - Frontend React moderne et responsive  
✅ **Base de données embarquée** - H2 database (pas de configuration externe)  
✅ **API REST complète** - Endpoints documentés pour l'intégration tierce  
✅ **Assistant IA intégré** - Ollama avec LLaMA2 pour des descriptions et analyses intelligentes  
✅ **Containerisation Docker** - Déploiement facile et reproductible  

---

## 🛠️ Technologies

| Composant | Technologie | Version | Description |
|-----------|-------------|---------|-------------|
| **Backend** | Spring Boot | 4.0.6+ | Framework Java pour API REST |
| **Base de données** | H2 Database | 2.4.240+ | Base de données SQL embarquée |
| **Frontend** | React | 18+ | Bibliothèque UI JavaScript |
| **Conteneurisation** | Docker | 24+ | Orchestration des services |
| **Complétion IA** | Ollama + LLaMA2 | latest | Modèle IA local pour les résumés |
| **Serveur Web** | Nginx | latest | Reverse proxy (optionnel) |

---

## 📦 Prérequis

Avant de démarrer, assurez-vous que vous avez :

### Matériel
- **Processeur** : Intel Core i5 / AMD Ryzen 5 (minimum)
- **RAM** : 8 GB minimum (16 GB recommandé pour l'IA)
- **Espace disque** : 10 GB minimum
  - 3.8 GB pour le modèle LLaMA2
  - 2 GB pour les images Docker
  - 2 GB pour les données

### Logiciels
- **Docker Desktop** (Windows/Mac) ou **Docker Engine** (Linux)
  - [Télécharger Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Version minimale : 24.0
- **Git** (pour cloner le projet)
  - [Télécharger Git](https://git-scm.com)

### Ports disponibles
L'application utilise les ports suivants (à confirmer libres) :
- **8081** - Backend API (Spring Boot)
- **3001** - Frontend Web (React)
- **11434** - Ollama IA

**Vérifier les ports disponibles :**
```bash
# Windows (PowerShell)
netstat -ano | findstr :8081

# macOS/Linux
lsof -i :8081
```

---

## 🚀 Installation rapide

### Option 1️⃣ : Avec Docker (RECOMMANDÉ - 3 minutes)

**La plus simple et la plus fiable.**

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/voiture-shop-fullstack.git
cd voiture-shop-fullstack

# 2. Démarrer tous les services
docker-compose up -d --build

# 3. Télécharger le modèle IA (première fois - ~15 minutes)
docker exec -it ollama ollama pull llama2

# 4. Vérifier que tout fonctionne
docker ps
```

**Accès à l'application :**
- 🌐 **Frontend** : http://localhost:3001
- 🔌 **API** : http://localhost:8081/api/voitures
- 💾 **Base de données** : http://localhost:8081/h2-console

---

### Option 2️⃣ : Sans Docker (Développement local)

**Plus lent mais idéal pour développer.**

#### Prérequis supplémentaires
- **Java JDK** 17+ (télécharger [OpenJDK](https://openjdk.java.net))
- **Maven** 3.8+ (pour compiler Spring Boot)
- **Node.js** 18+ et npm (pour React)
- **Ollama** installé localement (pour l'IA)

#### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/voiture-shop-fullstack.git
cd voiture-shop-fullstack

# ═══ Terminal 1 : Backend ═══
cd backend
mvn clean install
mvn spring-boot:run
# Le backend démarre sur http://localhost:8081

# ═══ Terminal 2 : Frontend ═══
cd frontend
npm install
npm start
# Le frontend démarre sur http://localhost:3001

# ═══ Terminal 3 : IA Ollama ═══
ollama serve
ollama pull llama2
# L'IA est prête sur http://localhost:11434
```

---

## 🎮 Guide d'utilisation

### Écran d'accueil
1. Ouvrir http://localhost:3001
2. Vous verrez la page **"Bienvenue"** avec un bouton **"Commencer"**

### 📝 Gérer les voitures

#### ➕ Ajouter une voiture
1. Cliquez sur **"Ajouter Voiture"** dans la barre de navigation
2. Remplissez le formulaire :
   - **Marque** : ex. Tesla, BMW, Ford
   - **Modèle** : ex. Model 3, X5, F-150
   - **Couleur** : ex. Noir, Bleu métallisé
   - **Année** : ex. 2024
   - **Prix** : ex. 45000 (en euros)
   - **Description** : optionnel
3. Cliquez sur **"Ajouter"**

#### ✏️ Modifier une voiture
1. Dans la liste, cliquez sur l'icône **✏️** d'une voiture
2. Modifiez les champs
3. Cliquez sur **"Modifier"**

#### 🗑️ Supprimer une voiture
1. Dans la liste, cliquez sur l'icône **🗑️**
2. Confirmez la suppression

#### 📋 Lister les voitures
- Cliquez sur **"Lister les Voitures"** dans la barre de navigation
- Vous verrez toutes les voitures avec leurs détails

---

### 🤖 Utiliser l'Assistant IA (Ollama)

#### Accéder à l'IA
1. Allez sur la page **"Modifier"** d'une voiture existante
2. Trouvez le bloc **"🤖 Assistant IA (Ollama)"** en bas du formulaire

#### 📝 Générer un résumé automatique
1. Cliquez sur le bouton **"📝 Générer un résumé"**
2. L'IA analyse la voiture et remplir automatiquement le champ **Description**
3. Exemples de descriptions générées :
   - *"Tesla Model 3 : Une voiture électrique écologique et performante..."*
   - *"BMW X5 : SUV luxueux avec un excellent confort de conduite..."*

#### 💬 Poser une question à l'IA
1. Dans le bloc IA, rentrez une question dans le champ **"Posez une question"**
2. Cliquez sur **"Envoyer"**
3. L'IA répond en 2-5 secondes

**Exemples de questions :**
- *"Cette voiture est-elle économique en carburant ?"*
- *"Quels sont les avantages de ce modèle ?"*
- *"Est-ce un bon choix pour une famille ?"*
- *"Quel est le coût d'entretien estimé ?"*
- *"Cette voiture est-elle sécurisée ?"*

---

## 🧪 Tests et vérifications

### ✅ Test 1 : Vérifier que Docker fonctionne
```bash
docker ps
```
**Résultat attendu :**
```
CONTAINER ID   IMAGE                    STATUS
abc123...      voiture-shop-backend     Up 2 minutes
def456...      voiture-shop-frontend    Up 2 minutes
ghi789...      ollama                   Up 2 minutes
```

---

### ✅ Test 2 : API REST (Backend)
```bash
curl http://localhost:8081/api/voitures
<img width="973" height="529" alt="image" src="https://github.com/user-attachments/assets/d9ef009d-4526-46ab-a5a0-0e6112fc24fb" />

```
**Résultat attendu :**
```json
[
  {
    "id": 1,
    "marque": "Tesla",
    "modele": "Model 3",
    "couleur": "Noir",
    "annee": 2024,
    "prix": 45000
  }
]
```

---

### ✅ Test 3 : Interface Web (Frontend)
1. Ouvrir http://localhost:3001 dans un navigateur
2. Vous devez voir une page avec :
   - Une barre de navigation
   - Un texte de bienvenue
   - Des boutons pour ajouter/lister les voitures

---

### ✅ Test 4 : Base de données H2
1. Ouvrir http://localhost:8081/h2-console
2. Configuration :
   - **JDBC URL** : `jdbc:h2:file:./data/voitureshop`
   - **User** : `sa`
   - **Password** : (laisser vide)
3. Cliquez sur **"Connect"**
4. Vous verrez les tables (VOITURE, PROPRIETAIRE, etc.)

---

### ✅ Test 5 : Assistant IA (Ollama)
```bash
docker exec -it ollama ollama run llama2 "Bonjour, décris une Tesla Model 3"
```
**Résultat attendu :** L'IA répond en français avec une description

---

### ✅ Test 6 : Logs en direct
```bash
# Voir tous les logs
docker-compose logs -f

# Voir les logs du backend uniquement
docker-compose logs -f backend

# Voir les logs du frontend uniquement
docker-compose logs -f frontend

# Voir les logs de l'IA
docker-compose logs -f ollama
```

---

## 📊 API Endpoints

### 🚗 Gestion des voitures

| Méthode | Endpoint | Description | Exemple |
|---------|----------|-------------|---------|
| **GET** | `/api/voitures` | Lister toutes les voitures | `curl http://localhost:8081/api/voitures` |
| **GET** | `/api/voitures/{id}` | Obtenir une voiture par ID | `curl http://localhost:8081/api/voitures/1` |
| **POST** | `/api/voitures` | Ajouter une nouvelle voiture | Voir exemple ci-dessous |
| **PUT** | `/api/voitures/{id}` | Modifier une voiture | Voir exemple ci-dessous |
| **DELETE** | `/api/voitures/{id}` | Supprimer une voiture | `curl -X DELETE http://localhost:8081/api/voitures/1` |

---

### 🤖 Endpoints IA (Ollama)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **GET** | `/api/ai/voitures/{id}/summary` | Générer un résumé automatique |
| **POST** | `/api/ai/voitures/{id}/ask` | Poser une question à l'IA |

---

### 📝 Exemples d'appels API

#### Lister toutes les voitures
```bash
curl http://localhost:8081/api/voitures
```

---

#### Obtenir une voiture spécifique
```bash
curl http://localhost:8081/api/voitures/1
```

---

#### Ajouter une voiture
```bash
curl -X POST http://localhost:8081/api/voitures \
  -H "Content-Type: application/json" \
  -d '{
    "marque": "Tesla",
    "modele": "Model 3",
    "couleur": "Noir métallisé",
    "annee": 2024,
    "prix": 45000,
    "description": "Voiture électrique haute performance"
  }'
```

---

#### Modifier une voiture
```bash
curl -X PUT http://localhost:8081/api/voitures/1 \
  -H "Content-Type: application/json" \
  -d '{
    "marque": "Tesla",
    "modele": "Model 3",
    "couleur": "Blanc",
    "annee": 2024,
    "prix": 46000,
    "description": "Modèle amélioré 2024"
  }'
```

---

#### Supprimer une voiture
```bash
curl -X DELETE http://localhost:8081/api/voitures/1
```

---

#### Générer un résumé IA
```bash
curl http://localhost:8081/api/ai/voitures/1/summary
```
**Réponse :**
```json
{
  "summary": "Tesla Model 3 : Une berline électrique révolutionnaire, connue pour..."
}
```

---

#### Poser une question à l'IA
```bash
curl -X POST http://localhost:8081/api/ai/voitures/1/ask \
  -H "Content-Type: text/plain" \
  -d "Cette voiture est-elle fiable et économe ?"
```
**Réponse :**
```json
{
  "answer": "Oui, la Tesla Model 3 est réputée pour sa fiabilité..."
}
```

---

## 🐳 Commandes Docker

### Gestion des services

```bash
# ▶️ Démarrer tous les services
docker-compose up -d

# ▶️ Démarrer avec reconstruction des images
docker-compose up -d --build

# ⏹️ Arrêter tous les services
docker-compose down

# 🔄 Redémarrer les services
docker-compose restart

# 📊 Voir l'état des containers
docker ps

# 📊 Voir l'état détaillé des containers
docker ps -a
```

---

### Gestion des logs

```bash
# 📋 Voir tous les logs en direct
docker-compose logs -f

# 📋 Voir les logs du backend
docker-compose logs -f backend

# 📋 Voir les logs du frontend
docker-compose logs -f frontend

# 📋 Voir les logs de l'IA Ollama
docker-compose logs -f ollama

# 📋 Voir les 100 dernières lignes de log
docker-compose logs --tail=100 backend
```

---

### Gestion du modèle IA

```bash
# 📥 Télécharger le modèle LLaMA2
docker exec -it ollama ollama pull llama2

# 📥 Télécharger un autre modèle (ex: mistral)
docker exec -it ollama ollama pull mistral

# 📋 Lister les modèles disponibles
docker exec -it ollama ollama list

# 🧪 Tester l'IA en ligne de commande
docker exec -it ollama ollama run llama2 "Bonjour"

# 🧪 Tester avec une question
docker exec -it ollama ollama run llama2 "Décris une Tesla Model 3 en 3 phrases"
```

---

### Accès aux containers

```bash
# 🔐 Accès au shell du backend (Java)
docker exec -it backend sh

# 🔐 Accès au shell du frontend (Node.js)
docker exec -it frontend sh

# 🔐 Accès au shell de l'IA
docker exec -it ollama sh
```

---

### Nettoyage et réinitialisation

```bash
# 🗑️ Arrêter et supprimer les containers
docker-compose down

# 🗑️ Supprimer aussi les volumes (⚠️ données perdues)
docker-compose down -v

# 🗑️ Supprimer les images
docker rmi voiture-shop-fullstack-backend voiture-shop-fullstack-frontend

# 🗑️ Nettoyage complet (conteneurs, images, volumes non utilisés)
docker system prune -a

# 🗑️ Reconstruire complètement
docker-compose up -d --build
```

---

## 📁 Structure du projet

```
voiture-shop-fullstack/
│
├── 📦 backend/                              # Spring Boot API
│   ├── src/
│   │   ├── main/java/com/example/
│   │   │   ├── 📂 model/                    # Entités JPA
│   │   │   │   ├── Voiture.java           # Entité Voiture
│   │   │   │   ├── Proprietaire.java      # Entité Proprietaire
│   │   │   │   └── VoitureRepository.java # Interface Repository
│   │   │   │
│   │   │   ├── 📂 service/                 # Services métier
│   │   │   │   ├── VoitureService.java    # Service CRUD
│   │   │   │   └── VoitureAiService.java  # Service IA/Ollama
│   │   │   │
│   │   │   ├── 📂 controller/              # Controllers REST
│   │   │   │   ├── VoitureController.java # API /api/voitures
│   │   │   │   └── AIController.java      # API /api/ai
│   │   │   │
│   │   │   ├── 📂 config/                  # Configuration
│   │   │   │   ├── WebConfig.java         # Config CORS
│   │   │   │   └── OllamaConfig.java      # Config Ollama
│   │   │   │
│   │   │   └── VoitureShopApplication.java # Classe principale
│   │   │
│   │   ├── resources/
│   │   │   ├── application.properties      # Config Spring
│   │   │   ├── application-dev.properties  # Config développement
│   │   │   └── data.sql                    # Données initiales
│   │   │
│   │   └── test/                           # Tests unitaires
│   │
│   ├── Dockerfile                          # Image Docker
│   ├── pom.xml                            # Dépendances Maven
│   └── data/                              # Base de données H2 (auto-créé)
│
├── 📦 frontend/                             # React Web UI
│   ├── src/
│   │   ├── 📂 Components/
│   │   │   ├── Bienvenue.js               # Page d'accueil
│   │   │   ├── NavigationBar.js           # Barre de navigation
│   │   │   ├── VoitureListe.js            # Liste des voitures
│   │   │   ├── Voiture.js                 # Formulaire CRUD
│   │   │   ├── AIAssistant.js             # Bloc IA/Ollama
│   │   │   └── Erreur.js                  # Page erreur
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── api.js                     # Appels API backend
│   │   │   └── aiService.js               # Appels API IA
│   │   │
│   │   ├── 📂 styles/
│   │   │   ├── App.css                    # Styles globaux
│   │   │   └── components.css             # Styles composants
│   │   │
│   │   ├── App.js                         # Composant principal
│   │   ├── App.css                        # Styles App
│   │   └── index.js                       # Point d'entrée
│   │
│   ├── public/
│   │   ├── index.html                     # HTML principal
│   │   ├── favicon.ico                    # Icône
│   │   └── manifest.json                  # PWA manifest
│   │
│   ├── Dockerfile                         # Image Docker
│   ├── package.json                       # Dépendances npm
│   ├── package-lock.json                  # Lock file
│   └── node_modules/                      # Modules npm (auto-généré)
│
├── 🐳 docker-compose.yml                   # Orchestration Docker
├── .gitignore                             # Fichiers à ignorer
├── README.md                              # Cette documentation
└── LICENSE                                # Licence du projet
```

---

## 🔧 Dépannage

### 🔴 Problème : "Port 8081 already in use"

**Cause** : Un autre programme occupe le port  
**Solution** :
```bash
# Windows (PowerShell)
netstat -ano | findstr :8081
taskkill /f /pid <PID>

# macOS/Linux
lsof -i :8081
kill -9 <PID>
```

---

### 🔴 Problème : "Empty reply from server"

**Cause** : Le backend n'a pas démarré  
**Solution** :
```bash
docker-compose logs backend
# Voir l'erreur et corriger
docker-compose restart backend
```

---

### 🔴 Problème : "L'IA ne répond pas" ou "Ollama not found"

**Cause** : Le modèle LLaMA2 n'est pas téléchargé  
**Solution** :
```bash
# Télécharger le modèle (15-30 minutes, 3.8 GB)
docker exec -it ollama ollama pull llama2

# Vérifier qu'il est bien téléchargé
docker exec -it ollama ollama list
```

---

### 🔴 Problème : "Frontend affiche une page vide"

**Cause** : npm install ou build en cours  
**Solution** :
```bash
# Attendre 5-10 minutes au premier lancement
docker-compose logs frontend

# Si problème persiste
docker-compose down
docker-compose up -d --build
```

---

### 🔴 Problème : "Connection refused" ou "Cannot connect to Docker"

**Cause** : Docker Desktop n'est pas lancé  
**Solution** :
1. Ouvrir **Docker Desktop**
2. Attendre que le daemon démarre (icône en haut)
3. Relancer `docker-compose up -d`

---

### 🔴 Problème : "Base de données verrouillée"

**Cause** : Instance précédente encore active  
**Solution** :
```bash
docker-compose down
docker-compose down -v  # Supprimer aussi les volumes
docker-compose up -d --build
```

---

### 🔴 Problème : "Erreur réseau Docker (DNS)"

**Cause** : Problème de connectivité réseau du container  
**Solution** :
```bash
# Redémarrer Docker
docker-compose restart

# Ou réinstaller Ollama sur la machine directement
ollama serve
```

---

### 🔴 Problème : "npm ERR! ERESOLVE unable to resolve dependency tree"

**Cause** : Incompatibilité de version Node/npm  
**Solution** :
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start
```

---

### 🔴 Problème : "Erreur lors du build Maven"

**Cause** : Dépendances manquantes ou JDK incompatible  
**Solution** :
```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

---

### 🔄 Réinitialisation complète

Si rien ne fonctionne, faire un **reset complet** :

```bash
# 1. Arrêter tous les services
docker-compose down -v

# 2. Supprimer les images
docker rmi voiture-shop-fullstack-backend voiture-shop-fullstack-frontend

# 3. Supprimer les données locales
rm -rf backend/data

# 4. Nettoyer le système Docker
docker system prune -a

# 5. Reconstruire
docker-compose up -d --build

# 6. Télécharger le modèle IA
docker exec -it ollama ollama pull llama2
```

---

## 📈 Performances et temps de démarrage

| Étape | Temps | Notes |
|-------|-------|-------|
| Premier démarrage (build images) | 3-5 min | Téléchargement des bases d'images |
| Démarrage application | 30 sec | Après première fois |
| Téléchargement modèle LLaMA2 | 15-30 min | Une seule fois, dépend de la connexion |
| Temps réponse IA | 2-5 sec | Dépend du CPU |
| Démarrages suivants | 10-15 sec | Très rapide |

---

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. **Fork** le repository
2. **Créer une branche** : `git checkout -b feature/ma-feature`
3. **Commit** : `git commit -m "Add ma-feature"`
4. **Push** : `git push origin feature/ma-feature`
5. **Ouvrir une Pull Request**

### Domaines d'amélioration
- [ ] Ajouter authentification utilisateur
- [ ] Tests unitaires complets
- [ ] Pagination pour les listes longues
- [ ] Support de plusieurs langues
- [ ] Dashboard avec statistiques
- [ ] Export en PDF/Excel

---







## 🚀 Prochaines étapes

Après avoir démarré l'application :

1. ✅ Vérifier que tout fonctionne (voir section Tests)
2. 📝 Ajouter quelques voitures de test
3. 🤖 Tester l'assistant IA
4. 🔧 Explorer le code et personnaliser
5. 📚 Lire la [documentation API complète](#-api-endpoints)
6. 🌐 Déployer sur votre serveur

---

## 📅 Dernière mise à jour

**Mai 2026** - Documentation complète et mise à jour pour v1.0

---

