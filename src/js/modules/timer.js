function timer(deadline) {

    function getTimeRemaining(endtime) {
        const diff = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((diff - (days * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((diff - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((diff - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60)) / 1000);

        return {
            'total': diff,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function zero(arg) {
        if(arg >= 0 && arg < 10) {
            return `0${arg}`;
        } else {
            return `${arg}`;
        }
    }

    function setTime(endtime) {
        const daysE = document.querySelector('#days'),
            hoursE = document.querySelector('#hours'),
            minutesE = document.querySelector('#minutes'),
            secondsE = document.querySelector('#seconds'),
            id = setInterval(update, 1000);

        update();

        function update() {
            const t = getTimeRemaining(endtime);

            daysE.innerHTML = zero(t.days);
            hoursE.innerHTML = zero(t.hours);
            minutesE.innerHTML = zero(t.minutes);
            secondsE.innerHTML = zero(t.seconds);

            if(t.total <= 0) {
                clearInterval(id);
            }
        }
    }

    setTime(deadline);
}

export default timer;