<template>
    <section class="filter">
        <div class="filter__container">
            <h2 class="title filter__title">{{ title }}</h2>
            <div class="filter__content">
                <div class="filter__station">
                    <swiper class="filter__slider"
                     :modules="modules"
                     :slides-per-view="5"
                     :space-between="15"
                     :navigation="{
                        prevEl: '.filter__slider-button-prev',
                        nextEl: '.filter__slider-button-next',
                     }"
                     @swiper="onSwiper"
                     @slideChange="onSlideChange"
                    >
                        <swiper-slide 
                         class="filter__slide" 
                         v-for="(station, index) in stationsList" 
                         :key="station"
                         @click="setSliderFilter(station)"
                        >
                            <p class="filter__slide-text" :class="index === 0 ? 
                             'filter__slide-text-first' : index === stationsList.length - 1 ?
                             'filter__slide-text-last' : ''"  ref="swiperSlide"
                            >
                                {{ station }}
                            </p>
                        </swiper-slide>
                    </swiper>
                    <div class="filter__slider-button-prev filter__slider-button" v-show="data.prevButton">
                        <img src="@/assets/images/icons/slider/btn-prev.svg" alt="Prev" class="filter__arrow-prev">
                    </div>
                    <div class="filter__slider-button-next filter__slider-button" v-show="data.nextButton">
                        <img src="@/assets/images/icons/slider/btn-next.svg" alt="Next" class="filter__arrow-next">
                    </div> 
                </div>
                <div class="filter__content-right">
                    <div class="filter__date-container" v-if="$route.path !== '/station-controle'">
                        <button class="filter__date-button" 
                         v-for="(filter, index) in dateFiltersList" 
                         :key="filter" @click="setFilter(filter)"
                         >
                            <p class="filter__date-text" :class="index === 0 ? 
                                'filter__date-text-first' : index === dateFiltersList.length - 1 ?
                                'filter__date-text-last' : ''"  ref="dataFilters" 
                            >
                                {{ filter }}
                            </p>
                        </button>
                    </div>
                    <div class="filter__button-container">
                        <button class="filter__button" v-if="$route.path === '/station-controle'" @click="toggleIsShow">
                            <img src="@/assets/images/icons/filter/add.svg" alt="Icon" class="filter__button-icon">
                            <p class="filter__button-text">{{ $t("Analytics.Filters.add") }}</p>
                        </button>
                        <button class="filter__button" v-else>
                            <img src="@/assets/images/icons/filter/filter.svg" alt="Icon" class="filter__button-icon">
                            <p class="filter__button-text">{{ $t("Analytics.Filters.filter") }}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div>
        <AddStationPopup :isShow="isShow" @toggleIsShow="toggleIsShow" />
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import Filter from '@/scriprts/filter';
import AddStationPopup from '../popup/AddStationPopup.vue';

import 'swiper/css';
import 'swiper/css/navigation';

import { onMounted, ref } from 'vue';

export default {
    data: () => ({
        stationsList: [
            "Все станции",
            "Беруний",
            "Бодомзор",
            "Буюк Ипак Юли",
            "Чилонзор",
            "Гафур Гулом",
            "Космонавтлар",
            "Машинасозлар",
            "Мустакиллик",
            "Новза",
            "Олмазор",
            "Уйбек",
            "Пушкин",
            "Сабир Рахимов",
            "Тинчлик",
            "Туркистон"
        ],

        dateFiltersList: ['День', 'Неделя', 'Месяц', 'Год',],
        dataFilter: 'День',
        isShow: false
    }),

    components: {
        Swiper,
        SwiperSlide,
        AddStationPopup
    },

    props: {
        title: String
    },

    methods: {
        setFilter (nameFilter) {
            if (this.$route.path !== '/station-controle') {
                this.dataFilter = nameFilter;
    
                const filter = new Filter ({
                    allElements: this.$refs.dataFilters,
                    activeClass: 'filter__active',
                    activeFilter: this.dataFilter
                });
    
                filter.setFilter();
            }
        },

        toggleIsShow () {
            this.isShow = !this.isShow;
        }
    },

    watch: {
        'title': {
            deep: true,
        }
    },

    mounted () {
        this.setFilter(this.dataFilter);
        
        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.dateFiltersList = messages[lang].Analytics.Filters.dateFiltersList;
    },

    setup () {
        // comopositions api used only for slider, but all project writen in options api

        let swiperInstance;

        const swiperSlide = ref(null);

        let data = ref({
            filter: 'Все станции',
            nextButton: true,
            prevButton: false
        });

        const onSwiper = (swiper) => {
            swiperInstance = swiper;
            swiperInstance.on('slideChange', onSlideChange);
        };

        //for slider
        const setSliderFilter = (nameFilter) => {
            data.value.filter = nameFilter;

            const filter = new Filter ({
                allElements: swiperSlide.value,
                activeClass: 'filter__active',
                activeFilter: data.value.filter
            });

            filter.setFilter();
        }

        const onSlideChange = () => {
            const sliderLength = swiperInstance.slides.length;
            const slidesPreView = swiperInstance.params.slidesPerView;
            const activeSlide = swiperInstance.activeIndex;

            const differenceLength = sliderLength - slidesPreView;

            if (activeSlide === 0) {
                data.value.prevButton = false;
                data.value.nextButton = true;
            } 
            else if (activeSlide === differenceLength) {
                data.value.prevButton = true;
                data.value.nextButton = false;
            } 
            else {
                data.value.prevButton = true;
                data.value.nextButton = true;
            }

            setSliderFilter(data.value.filter);
        };

        onMounted(() => {
            setSliderFilter(data.value.filter);
        })

        return {
            data,
            onSwiper,
            onSlideChange,
            swiperSlide,
            setSliderFilter,
            modules: [Navigation],
        };
    },
}

</script>