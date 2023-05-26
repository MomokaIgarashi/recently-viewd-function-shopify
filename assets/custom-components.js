import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class SwiperCode extends LitElement {

    static properties = {
      productSlides: {},
      howmany: {},
    };

    getProduct(index) {
        jQuery.ajax({
          dataType: 'json',
          url: `/products/${this.productKeys[index]}.js`,
          cache: false,
          success: data => {
            console.log(data);
            this.products.push(data)
            if (index +1 < this.productKeys.length) {
              this.getProduct(index +1)
              
            }
            else{
              this.createProductSlides()
            }
          }
      });
    }

    createProductSlides(){
      this.productSlides = this.products.map(product => {
        const{handle, url, title, featured_image, price} = product
        return html`
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
      })
    }
    
    constructor() {
      super();
      this.productSlides = [];
      this.products = [];
      this.productKeys = jQuery.cookie('shopify_recently_viewed').split(' ')
      this.getProduct(0)
      console.log(this.howmany)
    }

    render() {
      return html` 
        <!-- <body>
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">${this.productSlides}</div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </body> -->
        <div class="swiper--wrapper">
          <swiper-container class="mySwiper" pagination="true" pagination-clickable="true" space-between="30"
            slides-per-view="3">
              ${this.productSlides}
          </swiper-container>
        </div>
      `;
    }

    createRenderRoot() {
      return this;
    }
}
customElements.define('swiper-code', SwiperCode);
