package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/", Handle)
	http.ListenAndServe(":4000", nil)
}

func Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	q := r.FormValue("q")
	answer := Answer(q)

	w.Write([]byte(answer))
}

func Answer(q string) string {
	return "xxx" + q
}
