package models

import (
	"github.com/hiepnguyen223/int3306-project/common"
)

func Migrate() {
	db := common.GetDB()
	db.SetupJoinTable(&User{}, "FavoriteSongs", &UserLikeSong{})
	db.AutoMigrate(&User{}, &Song{}, &Comment{})
}
