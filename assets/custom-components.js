class SwiperComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const divWrapper = document.createElement('div');
      divWrapper.className = 'swiper--wrapper';
  
      const swiperContainer = document.createElement('swiper-container');
      swiperContainer.className = 'mySwiper';
      swiperContainer.setAttribute('pagination', 'true');
      swiperContainer.setAttribute('pagination-clickable', 'true');
      swiperContainer.setAttribute('space-between', '30');
      swiperContainer.setAttribute('slides-per-view', '3');
  
      const swiperSlide = document.createElement('swiper-slide');
  
      const scriptTemplate = document.createElement('script');
      scriptTemplate.id = 'recently-viewed-product-template';
      scriptTemplate.type = 'text/x-jquery-tmpl';
      scriptTemplate.textContent = `
        <div id="product-\${handle}">
          <a href="\${url}">
            <img src="\${Shopify.Products.resizeImage(featured_image, "medium")}" />
            <span class="title">\${title}</span>
            <span>€ \${price / 100}</span>
          </a>
        </div>
      `;
  
      swiperSlide.appendChild(scriptTemplate);
      swiperContainer.appendChild(swiperSlide);
      divWrapper.appendChild(swiperContainer);
      shadow.appendChild(divWrapper);
    }
}
  
customElements.define('swiper-component', SwiperComponent);
  