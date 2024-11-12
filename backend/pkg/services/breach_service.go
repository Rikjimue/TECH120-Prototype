package services

import (
	"context"
	"fmt"

	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/models"
	"github.com/Rikjimue/TECH120-Prototype/backend/pkg/repositories"
)

type BreachService struct {
	breachRepo repositories.BreachRepository
}

func NewBreachService(breachRepo repositories.BreachRepository) *BreachService {
	return &BreachService{breachRepo: breachRepo}
}

//func (s *BreachService) CheckBreach(ctx context.Context) (*[]models.Breach, error) {
// Create a slice for the fields to iterate through
//fields := make([]string, 0, len(req.Fields))
//for field := range req.Fields {
//fields = append(fields, field)
//}

// Returns a TableField struct that holds the table name and the fields to be queried
// In the sentive service only 1 field is expected to be
//tableFields, err := s.breachRepo.GetTableNamesWithField(ctx, fields)

//if err != nil {
//return nil, err
//}

// Query those tables with the field and find
// Have the table names, now I need to query those table names with the fields combined with the value of the request.
//s.BreachRepo.FindBreachMatches(ctx, tableFields, )
//}

func (s *BreachService) SearchSensitive(ctx context.Context, req *models.SensitiveSearchRequest) (*models.SensitiveSearchResponse, error) {
	// Request validation
	if req == nil {
		return nil, fmt.Errorf("invalid request: request is nil")
	}

	// Map of the hash combined with the table's metadata
	match, err := s.breachRepo.SearchSensitiveMatch(ctx, req.Field, req.Hash)

	if err != nil {
		return nil, err
	}

	potentialMatches := make(map[string]*models.NormalSearchResponse)

	// For each hash found, create a NormalSearchResponse
	for hash, metadatas := range match {
		var matches []models.BreachMatch
		for _, metadata := range metadatas {
			// Convert metadata to match
			match := models.BreachMatch{
				ID:          metadata.ID,
				Name:        metadata.Name,
				Date:        metadata.Date,
				Description: metadata.Description,
				Severity:    metadata.Severity,
				Link:        metadata.Link,
				Fields:      make(map[string]string),
			}

			// Set all fields to "Can't Match" except the one that is being searched
			for _, field := range metadata.Fields {
				if field == req.Field {
					match.Fields[field] = "Match" // Only Partial Match, client verifies full match
				} else {
					match.Fields[field] = "Can't Match"
				}
			}

			matches = append(matches, match)
		}

		potentialMatches[hash] = &models.NormalSearchResponse{
			Matches: matches,
		}
	}

	// Put data into a response
	return &models.SensitiveSearchResponse{
		PotentialPasswords: potentialMatches,
	}, nil
}
