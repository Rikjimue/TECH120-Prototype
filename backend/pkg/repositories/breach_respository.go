package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/models"
	"github.com/lib/pq"
)

type BreachRepository interface {
	SearchSensitiveMatch(ctx context.Context, field string, hash string) (map[string][]models.BreachMetadata, error)
	//FindBreachMatches(ctx context.Context, )
}

type SQLBreachRepository struct {
	db *sql.DB
}

func NewSQLBreachRepository(db *sql.DB) *SQLBreachRepository {
	return &SQLBreachRepository{db: db}
}

// Change to common table expressions
func (r *SQLBreachRepository) SearchSensitiveMatch(ctx context.Context, field string, hash string) (map[string][]models.BreachMetadata, error) {
	// Find tables with the field
	breachRows, err := r.db.QueryContext(ctx, "SELECT * FROM breach_metadata WHERE $1 = ANY(breach_fields)", field)

	if err != nil {
		return nil, err
	}
	defer breachRows.Close()

	var breaches []models.BreachMetadata
	for breachRows.Next() {
		var breach_metadata models.BreachMetadata
		if err := breachRows.Scan(
			&breach_metadata.ID,
			&breach_metadata.Name,
			&breach_metadata.Date,
			&breach_metadata.Description,
			&breach_metadata.Severity,
			pq.Array(&breach_metadata.Fields),
			&breach_metadata.Link,
		); err != nil {
			return nil, err
		}
		breaches = append(breaches, breach_metadata)
	}

	// TODO: Change to use go routines
	// Search for the hash inside these tables
	matches := make(map[string][]models.BreachMetadata)
	for _, breach_metadata := range breaches {
		query := fmt.Sprintf(
			"SELECT DISTINCT %s FROM %s WHERE %s LIKE $1",
			pq.QuoteIdentifier(field),                // Column name
			pq.QuoteIdentifier(breach_metadata.Name), // Table name
			pq.QuoteIdentifier(field),                // Column name again
		)

		// Then use the query with parameter for the value
		rows, err := r.db.QueryContext(ctx, query, hash+"%")
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		// Each row = different hash string
		for rows.Next() {
			var hash string
			if err := rows.Scan(
				&hash,
			); err != nil {
				return nil, err
			}
			matches[hash] = append(matches[hash], breach_metadata)
		}
	}
	return matches, nil
}
