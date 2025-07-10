# TP Kubernetes 

## Description du Projet

Ce projet implémente deux services web Node.js conteneurisés et déployés dans un cluster Kubernetes.

### Architecture

- **app1** : Service principal qui expose un endpoint `/health` qui vérifie la disponibilité du second service
- **app2** : Service secondaire qui expose un endpoint `/hello` qui répond avec un code 200

Le service **app1** vérifie que tout fonctionne correctement en testant l’accessibilité de l’endpoint `/hello` exposé par **app2**. Si app2 répond avec un code 200, alors app1 considère que tout est OK et renvoie lui aussi un code 200 sur son endpoint `/health`. En revanche, si app2 ne répond pas ou retourne une erreur, alors app1 renverra un code 500 sur `/health`.

## Structure du Projet

```
.
├── app1/                  
│   ├── app.js             
│   ├── Dockerfile         
│   └── package.json       
├── app2/                  
│   ├── app.js             
│   ├── Dockerfile         
│   └── package.json       
└── kubernetes/            
    ├── app1-deployment.yaml  
    ├── app2-deployment.yaml  
    └── namespace.yaml        
```

## Technologies Utilisées

- **Backend** : Node.js avec Express
- **Conteneurisation** : Docker
- **Orchestration** : Kubernetes
- **Registry** : Docker Hub (evan182)

## Déploiement

Les images Docker sont hébergées sur Docker Hub sous les tags :
- `evan182/app1:latest`
- `evan182/app2:latest`

Les services sont déployés dans le namespace `epa` avec les configurations suivantes :

- **app1** : 
  - Déployé avec 2 réplicas
  - Expose un LoadBalancer sur le port 80
  - Inclut un endpoint `/health`

- **app2** : 
  - Déployé avec 2 réplicas
  - Service de type ClusterIP accessible uniquement dans le cluster
  - Inclut un endpoint `/hello`

## Communication Inter-Services

Le service app1 communique avec app2 via l'URL interne `http://app2-service:3000`.
