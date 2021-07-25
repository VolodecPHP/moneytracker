<template>
  <div class="show-spendings-list-wrapper">
		<div class="card sorts-panel">
			<div class="sorts-panel-column">
				<label>
					<span>Фільтр:</span>
					<input type="text" class="input-default" v-model="searchFilter">
				</label>
			</div>
			<div class="sorts-panel-column">
				<label>
					<span>Загальні витрати:</span>
					<input type="number" class="input-default" min="0" max="99999" v-model="minTotal">
					<span class="dash">-</span>
					<input type="number" class="input-default" :min="minTotal" max="99999" v-model="maxTotal">
					<button class="icon-reset-filters" @click="resetFilters()">
						<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
					</button>
				</label>
			</div>
			<div class="sorts-panel-column">
			<label class="sort-label">
				<span>Параметр сортування:</span>
			</label>
			<label class="sort-label">
				<span>Витрати</span>
				<input type="radio" name="sortParam" value="total" v-model="sortParam">
			</label>
			<label class="sort-label">
				<span>Дата</span>
				<input type="radio" name="sortParam" value="date" v-model="sortParam">
			</label>
			</div>
			<button class="sort-button" @click="sortDirection *= -1">
				<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path fill="currentColor" d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" v-if="sortDirection === 1">
				</path>
				<path fill="currentColor" d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352z" v-else></path>
				</svg>
			</button>
		</div>
    <transition-group
      name="list-complete"
      tag="ul"
      class="show-spendings-card-list-wrapper"
    >
      <li
        v-for="(spending, i) in separatedSpendings"
        :key="i"
        class="card show-spendings-card--list"
      >
				<div class="acordion-trigger" @click="openDetails($event)">
					<div class="description-of-spendig">
						{{ spending.spending.description }}
					</div>
					<div class="date-of-spending">
						{{ spending.id }}
					</div>
				</div>
				<div class="spending-detais">
					<div class="spendings-details-desctiption">
						{{ spending.spending.description }}
					</div>
					<template v-for="(key, i) in Object.keys(spending.spending)" :key="i">
					<div class="details-category" v-if="!['total','description'].includes(key) && spending.spending[key].total">
						<div class="details-category-title">
							{{ key }}
						</div>
						<template v-for="spend in Object.keys(spending.spending[key])" :key="spend">
							<div class="details-category-spend" v-if="spend != 'total' && spending.spending[key][spend] != 0">
								{{ spend }} : {{ spending.spending[key][spend] }}
							</div>
						</template>
						<div class="details-category-total">
							Разом : {{ spending.spending[key].total }}
						</div>
					</div>
					</template>
					<div class="spendings-details-total">
						Разом : {{ spending.spending.total }}
					</div>
				</div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    dates: {
      type: Array,
      required: true,
      default: [],
    },
  },
	data() {
		return {
			sortDirection : 1,
			searchFilter : '',
			minTotal : 1,
			maxTotal : 99999,
			sortParam : 'date'
		}
	},
  computed: {
    separatedSpendings() {
      let res = [];

      this.$props.dates.map((date) => {
        date.spendings.map((singleSpending) => {
          res.push({ id: date.id, spending: singleSpending });
        });
      });

			if(this.sortParam === 'date') {
				res = res.sort((a,b) => a.id > b.id ? 1 : -1)
			} else {
				res = res.sort((a,b) => Number(a.spending.total) - Number(b.spending.total))
			}

			if(this.sortDirection === 1) {
				res.reverse()
			}
			
			res = res.filter(item => {
				return (item.spending.description.toUpperCase().includes(this.searchFilter.toUpperCase()) || item.id.includes(this.searchFilter)) && (item.spending.total >= this.minTotal && item.spending.total <= this.maxTotal)
			})

			this.closeCards()
			
      return res;
    },
  },
  methods: {
		openDetails(event) {
			let elemParrent = event.target.closest('.show-spendings-card--list')

			elemParrent.classList.toggle('open')

			if(!elemParrent.classList.contains ('open')) {
				elemParrent.style.height = "60px"
				return
			}

			let customheight = elemParrent.querySelector('.spending-detais').offsetHeight
			elemParrent.style.height = customheight + 60 + "px"
		},
		closeCards() {
			let cards = document.querySelectorAll('.show-spendings-card--list')

			cards.forEach(elem => {
				elem.classList.remove('open')
				elem.style.height = "60px"
			})
		},
		resetFilters() {
			this.minTotal = 1
			this.maxTotal = 99999
		}
	}, 
};
</script>

<style></style>
