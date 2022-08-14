class ClockItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <span class="time"></span>
      <span class="date"></span>
    `;
  }
}

customElements.define('clock-item', ClockItem);
