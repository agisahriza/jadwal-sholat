class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <h4><span class="navbar-brand mb-0 h1 text-app-bar"></span></h4>
        </div>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
