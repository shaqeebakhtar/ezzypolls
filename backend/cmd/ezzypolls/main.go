package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/shaqeebakhtar/ezzypolls/backend/internal/config"
	"github.com/shaqeebakhtar/ezzypolls/backend/internal/storage/mysql"
)

func main() {
	cfg := config.Load()

	_, err := mysql.New(cfg)
	if err != nil {
		log.Fatal(err)
	}

	slog.Info("storage initialized", slog.String("env", cfg.Env))

	r := mux.NewRouter().PathPrefix("/api").Subrouter()

	// routes
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hi from go http server!\n"))
	})

	server := &http.Server{
		Addr:    cfg.Addr,
		Handler: r,
	}

	slog.Info("server running at", slog.String("address", cfg.Addr))

	c := make(chan os.Signal, 1)

	signal.Notify(c, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()

	// Block until we receive our signal.
	<-c

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	server.Shutdown(ctx)

	slog.Info("server shutdown")
	os.Exit(0)
}
