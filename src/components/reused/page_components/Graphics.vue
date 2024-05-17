<template>
    <section class="graphics">
        <div class="graphics__container">
            <div class="graphics__bar">
                <div class="graphics__content">
                    <h2 class="graphics__title title">{{ $t("Analytics.Graphics.title") }}</h2>
                </div>
                <div class="graphics__filter">
                    <button class="graphics__filter-button" v-for="(button, index) in buttons" :key="button" @click="toggleFilter(index)" ref="button">
                        <img :src="button.icon" alt="Icon" class="graphics__filter-icon">
                        <p class="graphics__filter-text">{{ button.text }}</p>
                    </button>
                </div>
            </div>
            <div class="graphics__draw">
                <canvas class="graphics__canvas"></canvas>
            </div>
        </div>
    </section>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
    data: () => ({
        buttons: [
            {
                icon: require('@/assets/images/icons/graphics/arr-green.svg'),
                text: 'Прибыль',
            },
            {
                icon: require('@/assets/images/icons/graphics/arr-red.svg'),
                text: 'Затраты',
            }
        ],
        filter: 'Expenses'
    }),

    methods: {
        toggleFilter () {
            const activeClass = 'graphics__filter-button-active';

            if (this.filter === 'Expenses') {
                this.filter = 'Profit';

                this.$refs.button[1].classList.remove(activeClass);
                this.$refs.button[0].classList.add(activeClass);
            }
            else {
                this.filter = 'Expenses';

                this.$refs.button[0].classList.remove(activeClass);
                this.$refs.button[1].classList.add(activeClass);
            }
        },

        async drawGraphic () {
            const data = [
                { time: '7:00', count: 40 },
                { time: '8:00', count: 20 },
                { time: '9:00', count: 50 },
                { time: '10:00', count: 90 },
                { time: '11:00', count: 50 },
                { time: '12:00', count: 25 },
                { time: '13:00', count: 60 },
            ];

            const canvas = document.querySelector('.graphics__canvas');

            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(document.querySelector('.graphics__canvas'),{
                type: 'line',
                data: {
                    labels: data.map(row => row.time),
                    datasets: [{
                        label: this.filter,
                        data: data.map(row => row.count),
                        borderColor: this.filter === 'Profit' ? '#A0BA69' : 'rgba(232, 80, 41, 0.2)',
                        backgroundColor: this.filter === 'Profit' ? 'rgba(160, 186, 105, 0.2)' : 'rgba(232, 80, 41, 0.2)',
                        tension: 0.4,
                        pointBorderWidth: 0,
                        pointHoverRadius: 8,
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 4,
                        pointRadius: 1,
                        borderWidth: 5,
                        pointHitRadius: 16,
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 80,
                            fontColor: '#A0BA69'
                        }
                    },
                    elements: {
                        line: {
                            fill: true,
                        }
                    }
                }
            });
        }
    },

    watch: {
        'filter': {
            deep: true,
            handler () {
                this.drawGraphic();
            }
        }
    },

    async mounted () {
        this.toggleFilter(1);
        this.drawGraphic();

        this.buttons[0].text = this.$t('Analytics.Graphics.switcher.on');
        this.buttons[1].text = this.$t('Analytics.Graphics.switcher.off');
    }
}

</script>