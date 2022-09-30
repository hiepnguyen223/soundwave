package models

import "time"

type Comment struct {
	Author    User      `json:"author"`
	AuthorID  uint      `json:"author_id"`
	Song      Song      `json:"-"`
	SongID    uint      `json:"song_id"`
	Content   string    `gorm:"not null" json:"content"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}
