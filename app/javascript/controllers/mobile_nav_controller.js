import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "button"]

  connect() {
    this.open = false
    this.sync()
  }

  toggle() {
    this.open = !this.open
    this.sync()
  }

  close() {
    this.open = false
    this.sync()
  }

  sync() {
    this.panelTargets.forEach((panel) => {
      panel.classList.toggle("open", this.open)
      panel.classList.toggle("hidden", !this.open)
    })

    this.buttonTargets.forEach((button) => {
      button.setAttribute("aria-expanded", this.open.toString())
    })
  }
}
