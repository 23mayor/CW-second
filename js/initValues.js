const dateOptionsList = document.querySelector('#dateOptionsList')
const timeOptionsList = document.querySelector('#timeOptionsList')


const allowedISODates = [
    '2022-03-17T00:00:00Z',
    '2022-03-18T00:00:00Z',

    '2022-03-21T00:00:00Z',
    '2022-03-22T00:00:00Z',
    '2022-03-23T00:00:00Z',
    '2022-03-24T00:00:00Z',
    '2022-03-25T00:00:00Z',
]


for (const allowedISODate of allowedISODates) {
    const date = new Date(Date.parse(allowedISODate))

    const dateSlot = document.createElement('div')

    dateSlot.classList.add('select__item')

    dateSlot.textContent = date.toLocaleDateString('default', { day: 'numeric', month: 'long' })

    dateSlot.setAttribute('ISODate', date.toISOString())

    dateOptionsList.appendChild(dateSlot)
}

for (let utcHours = 6; utcHours <= 21; utcHours++) {
    const date = new Date(0)
    date.setUTCHours(utcHours)

    const timeSlot = document.createElement('div')

    timeSlot.classList.add('select__item')

    timeSlot.textContent = date.toLocaleTimeString()
        .slice(0, date.toLocaleTimeString().length - 3)

    timeSlot.setAttribute('ISODate', date.toISOString())

    timeOptionsList.appendChild(timeSlot)
}