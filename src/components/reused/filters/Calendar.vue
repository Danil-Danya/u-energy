<template>
    <div class="calendar">
        <div class="calendar__container">

        </div>
    </div>
</template>

<script>
const date = new Date();

export default {
    data: () => ({
        currYear: date.getFullYear,
        currMonth: date.getMonth,
        currDay: date.getDay,
        monthsRu: [
            'Январь', 'Февраль', 'Март', 
            'Апрель', 'Май', 'Июнь', 
            'Июль', 'Август', 'Сентябрь', 
            'Октябрь', 'Ноябрь', 'Декабрь',
        ],
        monthsEng: [
            'January', 'February', 'March',
            'April', 'May', 'June', 
            'July', 'August', 'September', 
            'October', 'November', 'December'
        ],
        weekRu: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс',],
        weekEng: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    }),

    methods: {
        renderCalendar () {
            
        }
    }
}

</script>

