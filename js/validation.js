let form = document.querySelector('.formWithValidation');

let validateBtn = form.querySelector('.validateBtn');
let name = form.querySelector('.name');
let email = form.querySelector('.email');
let fields = form.querySelectorAll('.field');

form.addEventListener('submit', async function(event) {

    try {

        document.querySelector('#submit').setAttribute('disabled', 'disabled')

        event.preventDefault();

        var errors = form.querySelectorAll('.error')

        for (var i = 0; i < errors.length; i++) {
            errors[i].remove()
        }

        if (!name.value) {
            name.style = 'border: 1px solid #DC5656; background-color: rgba(220, 86, 86, 0.2);'
            let error = document.createElement('div')
            error.className = 'error'
            error.style = 'margin-top: -20px; margin-bottom: 30px; color: #DC5656;'
            error.innerHTML = 'Fill out the field'
            name.after(error)
        }
        if (!email.value) {
            email.style = 'border: 1px solid #DC5656; background-color: rgba(220, 86, 86, 0.2);'
            let error = document.createElement('div')
            error.className = 'error'
            error.style = 'margin-top: -20px; margin-bottom: 30px; color: #DC5656;'
            error.innerHTML = 'Wrong email'
            email.after(error)
        }

        const pickedDateElem = document.querySelector('.select.date .selected')
        const pickedTimeElem = document.querySelector('.select.time .selected')

        if (!pickedDateElem) {
            alert('Please pick a date!')
            return
        }

        if (!pickedTimeElem) {
            alert('Please pick a time!')
            return
        }

        const pickedISODate = pickedDateElem.getAttribute('ISODate')
        const pickedISOTime = pickedTimeElem.getAttribute('ISODate')

        const resultingTime = new Date(Date.parse(pickedISOTime))

        const resultingDateTime = new Date(Date.parse(pickedISODate))

        resultingDateTime.setUTCHours(resultingTime.getUTCHours())
        resultingDateTime.setUTCMinutes(resultingTime.getUTCMinutes())

        if (window.parent) {
            // communicating with backend using api client from iframe's
            // parental page
            const {status, desc} = await new Promise((resolve, reject) => {


                window.parent.postMessage({
                    action: 'REQUEST_DEMO',
                    firstName: name.value,
                    email: email.value,
                    startingAt: resultingDateTime.toISOString()
                }, getParentOrigin())


                window.addEventListener('message', (event) => {
                    const {data} = event
                    const {action, status, desc} = data

                    if (action === 'REQUEST_DEMO_RESPONSE') {
                        resolve({status, desc})
                    }
                })

            })


            if (status.message !== 'OK') {
                alert(`${status.message} \n\n ${desc}`)
                return
            }



            const resultingDate = resultingDateTime.toLocaleDateString('default', {day: 'numeric', month: 'long'})

            const resultingStartTime = resultingDateTime.toLocaleTimeString()
                .slice(0, resultingDateTime.toLocaleTimeString().length - 3)

            // warn, the date obj modifying!
            resultingDateTime.setUTCHours(resultingDateTime.getUTCHours() + 1)

            const resultingEndTime =  resultingDateTime.toLocaleTimeString()
                .slice(0, resultingDateTime.toLocaleTimeString().length - 3)

            document.querySelector('#resultingDate').textContent = resultingDate
            document.querySelector('#resultingStartTime').textContent = resultingStartTime
            document.querySelector('#resultingEndTime').textContent = resultingEndTime

        }


        // fallback for layout visibility: no api requests, no data
        window.location = `#success`


    } catch (e) {
        console.error(e)
    } finally {
        document.querySelector('#submit').removeAttribute('disabled')
    }

});
