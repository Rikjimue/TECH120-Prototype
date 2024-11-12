package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/models"
	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/services"
)

type BreachHandler struct {
	breachService *services.BreachService
}

func NewBreachHandler(breachService *services.BreachService) *BreachHandler {
	return &BreachHandler{breachService: breachService}
}

func (h *BreachHandler) BreachChecker(w http.ResponseWriter, r *http.Request) {

}

func (h *BreachHandler) SensitiveChecker(w http.ResponseWriter, r *http.Request) {

	var req models.SensitiveSearchRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	matches, err := h.breachService.SearchSensitive(ctx, &req)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(matches)
	fmt.Println(json.NewEncoder(w).Encode(matches))
}
