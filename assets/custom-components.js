import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class MomomokaCode extends LitElement {

    static properties = {
      products: {},
    };
    
    constructor() {
      super();
      this.products = [];
      jQuery.cookie('shopify_recently_viewed').split(' ').forEach(productKey => jQuery.ajax({
        dataType: 'json',
        url: `/products/${productKey}.js`,
        cache: false,
        success: data => {
            console.log(data);
            const{handle, url, title, featured_image, price} = data
            this.products = [
              ...this.products,
              html`
              <swiper-slide>
                <div id="product-${handle}">
                        <a href="${url}">
                          <img src="${Shopify.Products.resizeImage(featured_image, "medium")}" />
                          <span class="title">${title}</span>
                          <span>€ ${price /100}</span>
                        </a>
                </div>
              </swiper-slide>
            `
            ]
        }
    }));
    }

    firstUpdated() {
      const element = this.renderRoot.querySelector('swiper-container');
      element.initialize()
    }

    render() {
      return html`
        <div class="swiper--wrapper">
      <swiper-container init="false" class="mySwiper" pagination="true" pagination-clickable="true" space-between="30" slides-per-view="3">
      <swiper-slide>
          <img class="swiper--image" src="https://cdn.shopify.com/s/files/1/0766/7784/1216/files/SideTableA.jpg?v=1684433479" alt="">
          <div class="swiper--product">
              <p>Slide1</p>
              <p>100EUR</p> 
          </div>
      </swiper-slide>
      <swiper-slide>
          <img class="swiper--image" src="https://cdn.shopify.com/s/files/1/0766/7784/1216/files/SideTableA.jpg?v=1684433479" alt="">
          <div class="swiper--product">
              <p>Slide1</p>
              <p>100EUR</p> 
          </div>
      </swiper-slide>
      <swiper-slide>
          <img class="swiper--image" src="https://cdn.shopify.com/s/files/1/0766/7784/1216/files/SideTableA.jpg?v=1684433479" alt="">
          <div class="swiper--product">
              <p>Slide1</p>
              <p>100EUR</p> 
          </div>
      </swiper-slide>
      <swiper-slide>
          <img class="swiper--image" src="https://cdn.shopify.com/s/files/1/0766/7784/1216/files/SideTableA.jpg?v=1684433479" alt="">
          <div class="swiper--product">
              <p>Slide1</p>
              <p>100EUR</p> 
          </div>
      </swiper-slide>
      </swiper-container>
    </div>
      `;
    }
}
customElements.define('momoka-code', MomomokaCode);

// class SwiperComponent extends HTMLElement {
//     constructor() {
//       super();
//       const shadow = this.attachShadow({ mode: 'open' });
  
//       const divWrapper = document.createElement('div');
//       divWrapper.className = 'swiper--wrapper';
  
//       const swiperContainer = document.createElement('swiper-container');
//       swiperContainer.className = 'mySwiper';
//       swiperContainer.setAttribute('pagination', 'true');
//       swiperContainer.setAttribute('pagination-clickable', 'true');
//       swiperContainer.setAttribute('space-between', '30');
//       swiperContainer.setAttribute('slides-per-view', '3');
  
//       const swiperSlide = document.createElement('swiper-slide');
  
//       const scriptTemplate = document.createElement('script');
//       scriptTemplate.id = 'recently-viewed-product-template';
//       scriptTemplate.type = 'text/x-jquery-tmpl';
//       scriptTemplate.textContent = `
//         <div id="product-\${handle}">
//           <a href="\${url}">
//             <img src="\${Shopify.Products.resizeImage(featured_image, "medium")}" />
//             <span class="title">\${title}</span>
//             <span>€ \${price / 100}</span>
//           </a>
//         </div>
//       `;
  
//       swiperSlide.appendChild(scriptTemplate);
//       swiperContainer.appendChild(swiperSlide);
//       divWrapper.appendChild(swiperContainer);
//       shadow.appendChild(divWrapper);
//     }
// }
  
// customElements.define('swiper-component', SwiperComponent);
  