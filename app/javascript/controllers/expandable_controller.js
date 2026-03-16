import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "overlay", "toggle", "label"]
  static values = { maxHeight: { type: Number, default: 256 } }

  connect() {
    this.expanded = false
    this.refresh()
  }

  toggle() {
    this.expanded = !this.expanded
    this.refresh()
  }

  refresh() {
    const isTall = this.contentTarget.scrollHeight > this.maxHeightValue

    this.contentTarget.style.maxHeight = !this.expanded && isTall ? `${this.maxHeightValue}px` : "none"
    this.contentTarget.classList.toggle("overflow-hidden", !this.expanded && isTall)

    this.overlayTargets.forEach((overlay) => {
      overlay.classList.toggle("hidden", this.expanded || !isTall)
    })

    this.toggleTargets.forEach((toggle) => {
      toggle.classList.toggle("hidden", !isTall)
    })

    this.labelTargets.forEach((label) => {
      label.textContent = this.expanded ? "Show Less" : "Show More"
    })
  }
}
