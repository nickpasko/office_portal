package handlers

import (
	"net/http"
	"fmt"
	"github.com/nickpasko/office_portal/model"
	"html/template"
)

func WcStatusHandler(w http.ResponseWriter, r *http.Request) {
	status, err := template.ParseFiles("templates/wc_status.html")
	if err != nil {
		fmt.Fprint(w, "Frag! Template not found!")
		return
	}

	data, err := model.ReadWcStatusFromDevice()
	status.Execute(w, data)
}