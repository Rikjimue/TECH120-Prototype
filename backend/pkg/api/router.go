package api

import (
	"database/sql"
	"net/http"

	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/api/handlers"
	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/repositories"
	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/services"
)

// TODO: Implement middleware, implement sub-routing

// Create router
func NewRouter(db *sql.DB) *http.ServeMux {
	mux := http.NewServeMux()

	// Initialize repositories
	//userRepo := repositories.NewSQLUserRepository(db)
	breachRepo := repositories.NewSQLBreachRepository(db)

	// Initialize Services
	//authService := services.NewAuthService(userRepo)
	breachService := services.NewBreachService(breachRepo)

	// Initialize handlers
	//authHandler := handlers.NewAuthHandler(authService)
	breachHandler := handlers.NewBreachHandler(breachService)

	// Setup routes
	//mux.HandleFunc("POST /api/v0/signup", authHandler.Signup)
	//mux.HandleFunc("POST /api/v0/login", authHandler.Login)

	mux.HandleFunc("POST /api/v0/breach-checker", breachHandler.BreachChecker)
	mux.HandleFunc("POST /api/v0/sensitive-checker", breachHandler.SensitiveChecker)

	return mux
}
