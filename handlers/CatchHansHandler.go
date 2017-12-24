package handlers

import (
	"net/http"
	"fmt"
	"html/template"
)

func CatchHansHandler(w http.ResponseWriter, r *http.Request) {
	index, err := template.ParseFiles("templates/hans.html")
	if err != nil {
		fmt.Fprint(w, "Frag! Template not found!")
		return
	}

	index.Execute(w, nil)
}