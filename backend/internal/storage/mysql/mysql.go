package mysql

import (
	"database/sql"

	"github.com/go-sql-driver/mysql"
	"github.com/shaqeebakhtar/ezzypolls/backend/internal/config"
)

type Mysql struct {
	Db *sql.DB
}

func New(cfg *config.Config) (*Mysql, error) {
	mysqlCfg := mysql.Config{
		User:   cfg.MySQLConfig.User,
		Passwd: cfg.MySQLConfig.Password,
		Net:    cfg.MySQLConfig.Net,
		Addr:   cfg.MySQLConfig.Address,
		DBName: cfg.MySQLConfig.DBName,
	}

	db, err := sql.Open("mysql", mysqlCfg.FormatDSN())

	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS polls (
		id CHAR(36) PRIMARY KEY,
		name VARCHAR(255),
		email VARCHAR(255)
		)`)

	if err != nil {
		return nil, err
	}

	return &Mysql{
		Db: db,
	}, nil
}
