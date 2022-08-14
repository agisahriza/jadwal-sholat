class JadwalHarian extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h4 class="md-fs-1">Jadwal Sholat <span class="lokasi"></span></h4>
      <h5>Subuh: <span class="subuh"></span></h5>
      <h5>Dzuhur: <span class="dzuhur"></span></h5>
      <h5>Ashar: <span class="ashar"></span></h5>
      <h5>Maghrib: <span class="maghrib"></span></h5>
      <h5>Isya: <span class="isya"></span></h5>
    `;
  }
}

customElements.define('jadwal-harian', JadwalHarian);
