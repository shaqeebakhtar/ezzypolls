package config

import (
	"flag"
	"log"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

type HTTPServer struct {
	Addr string `yaml:"address" env-required:"true"`
}

type MySQLConfig struct {
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	Net      string `yaml:"net"`
	Address  string `yaml:"address"`
	DBName   string `yaml:"dbname"`
}

type Config struct {
	Env         string `yaml:"environment" env:"environment" env-required:"true" env-default:"production"`
	MySQLConfig `yaml:"mysql" env-required:"true"`
	HTTPServer  `yaml:"http_server"`
}

func Load() *Config {
	var configPath string

	configPath = os.Getenv("CONFIG_PATH")

	if configPath == "" {
		flags := flag.String("config", "", "path to the configuration file")
		flag.Parse()

		configPath = *flags

		if configPath == "" {
			log.Fatal("Config path is not set")
		}
	}

	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		log.Fatalf("Config file doesn't exist: %s", configPath)
	}

	var cfg Config

	err := cleanenv.ReadConfig(configPath, &cfg)

	if err != nil {
		log.Fatalf("Can't read config file: %s", err.Error())
	}

	return &cfg
}
