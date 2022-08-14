class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="input-group my-3">
        <label for="input-kota" class="form-label my-auto me-2">Masukan Lokasi Anda</label>
        <input class="form-control rounded-2 me-2" list="datalistOptions" id="input-kota" placeholder="Type to search...">
        <datalist id="datalistOptions"></datalist>
        <button class="btn btn-outline-secondary button-carikota rounded-2" type="button" id="button-addon2">Button</button>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);
