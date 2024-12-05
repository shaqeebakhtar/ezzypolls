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
)

func main() {
	r := mux.NewRouter().PathPrefix("/api").Subrouter()

	// routes
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hi from go http server!\n"))
	})

	server := &http.Server{
		Addr:    "0.0.0.0:8000",
		Handler: r,
	}

	slog.Info("server running at http://localhost:8000")

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
