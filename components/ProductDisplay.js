app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-container">
        <div class="image-container">
            <img class="img" v-bind:src="image" :title="product">
        </div>
        <div class="details">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="stock > 10">In stock ✔</p>
            <p v-else-if="stock <= 10 && stock > 0">Almost sold out! 👀</p>
            <p v-else>Out of stock 😒</p>
            <p>Shipping: {{ shipping }}</p>
            <span>Details:</span>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <span>Colors:</span>
            <ul>
                <li
                    v-for="(variant, index) in variants"
                    :key="variant.id"
                    @mouseover="updateVariant(index)"
                    :style="{ color: variant.color }">
                    {{ variant.color }}
                </li>
            </ul>
            <br>
            <button v-on:click="addToCart" :disabled="!stock">Add to cart</button>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            brand: 'Fluffy',
            product: 'Socks',
            description: 'Warm and comfortable socks!',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 1, color: 'blue', image: 'assets/images/1.png', quantity: 0 },
                { id: 2, color: 'yellow', image: 'assets/images/2.png', quantity: 3 },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        stock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }

            return 2.99
        }
    }
})
