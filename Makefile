# Makefile para Docker Compose - Proyecto Full-Stack

# Variables
DOCKER_COMPOSE = docker-compose
BACKEND_SERVICE = backend
FRONTEND_SERVICE = frontend

.PHONY: help build up down logs clean restart ps

# Help - Muestra ayuda de comandos disponibles
help:
	@echo "🚀 Comandos disponibles para el proyecto Docker:"
	@echo "  make build       - Construir imágenes de Docker"
	@echo "  make up          - Levantar servicios (detached)"
	@echo "  make down        - Detener y remover servicios"
	@echo "  make logs        - Ver logs de los servicios"
	@echo "  make clean       - Limpiar recursos de Docker"
	@echo "  make restart     - Reiniciar servicios"
	@echo "  make ps          - Ver estado de contenedores"
	@echo "  make help        - Mostrar esta ayuda"

# Build - Construir imágenes
build:
	@echo "🏗️  Construyendo imágenes de Docker..."
	$(DOCKER_COMPOSE) build
	@echo "✅ Imágenes construidas correctamente"

# Up - Levantar servicios
up:
	@echo "🚀 Iniciando servicios..."
	$(DOCKER_COMPOSE) up -d
	@echo "✅ Servicios iniciados:"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:5000/api/health"

# Down - Detener servicios
down:
	@echo "🛑 Deteniendo servicios..."
	$(DOCKER_COMPOSE) down
	@echo "✅ Servicios detenidos"

# Logs - Ver logs
logs:
	@echo "📋 Mostrando logs..."
	$(DOCKER_COMPOSE) logs -f

# Clean - Limpiar recursos
clean:
	@echo "🧹 Limpiando recursos de Docker..."
	$(DOCKER_COMPOSE) down -v --remove-orphans
	docker system prune -f
	@echo "✅ Recursos limpiados"

# Restart - Reiniciar servicios
restart: down up
	@echo "🔄 Servicios reiniciados"

# PS - Ver estado de contenedores
ps:
	@echo "📊 Estado de contenedores:"
	$(DOCKER_COMPOSE) ps

# Comandos específicos para backend
backend-logs:
	$(DOCKER_COMPOSE) logs -f $(BACKEND_SERVICE)

backend-shell:
	$(DOCKER_COMPOSE) exec $(BACKEND_SERVICE) sh

# Comandos específicos para frontend
frontend-logs:
	$(DOCKER_COMPOSE) logs -f $(FRONTEND_SERVICE)

frontend-shell:
	$(DOCKER_COMPOSE) exec $(FRONTEND_SERVICE) sh

# Deploy - Para producción (ejemplo)
deploy-prod:
	@echo "🌐 Desplegando en producción..."
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml up -d --build
	@echo "✅ Despliegue completado"