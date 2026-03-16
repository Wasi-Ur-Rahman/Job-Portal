import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "tagsContainer"]
  static values = { paramName: { type: String, default: "user[skills_list][]" } }

  addTag(event) {
    event.preventDefault()
    let value = this.inputTarget.value.trim()
    if (!value) return

    // sanitize
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;")

    const tag = document.createElement("span")
    tag.className = "inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700"
    tag.innerHTML = `
      ${value}
      <button type="button" data-action="tags#removeTag" class="font-bold text-teal-700">×</button>
      <input type="hidden" name="${this.paramNameValue}" value="${value}">
    `
    this.tagsContainerTarget.appendChild(tag)
    this.inputTarget.value = ""
  }

  removeTag(event) {
    const tag = event.target.closest("span")
    if (tag) tag.remove()
  }
}
