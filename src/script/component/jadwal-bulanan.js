class JadwalBulanan extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h4 class="keterangan"></h4>
      <table class="table table-striped">
      </table>
    `;
  }
}

customElements.define('jadwal-bulanan', JadwalBulanan);
