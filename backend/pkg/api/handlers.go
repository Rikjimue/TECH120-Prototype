package api

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/models"
)

type CheckBreachHandler struct {
	DB *sql.DB
}

func (h *CheckBreachHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Email string `json:"email"`
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	breaches, err := checkBreaches(h.DB, request.Email)
	if err != nil {
		log.Printf("Error checking breaches: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"email":    request.Email,
		"breaches": breaches,
	})
}

func checkBreaches(db *sql.DB, email string) ([]models.Breach, error) {
	rows, err := db.Query("SELECT table_name, breach_date FROM breaches WHERE email = $1", email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var breaches []models.Breach
	for rows.Next() {
		var b models.Breach
		if err := rows.Scan(&b.TableName, &b.BreachDate); err != nil {
			return nil, err
		}
		breaches = append(breaches, b)
	}

	return breaches, rows.Err()
}
