/* Public viewing component. Source files remain editable in the workspace. */
customElements.define('image-slot', class extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({mode:'open'});
    const style = document.createElement('style');
    style.textContent = ':host{display:block;width:100%;height:100%;overflow:hidden}img{display:block;width:100%;height:100%;object-fit:cover}';
    const img = document.createElement('img');
    img.src = this.getAttribute('src') || '';
    img.alt = this.getAttribute('aria-label') || this.getAttribute('placeholder') || '';
    img.loading = 'lazy'; img.decoding = 'async';
    root.append(style,img);
  }
});
