module.exports = function(date, language, dayNames, monthNames) {
    this.date = date;
    this.language = language;
    this.dayNames = dayNames;
    this.monthNames = monthNames;

    /**
     * Returns the spoken time
     *
     * @returns {string}
     */
    this.getSpokenTime = function() {
        if (this.language == 'nl') {
            return this.getSpokenNLTime();
        }
        else {
            return this.getSpokenENTime();
        }
        // TODO: Implement more languages
    };

    /**
     * Returns the spoken date
     *
     * @returns {string}
     */
    this.getSpokenDate = function() {
        if (this.language == 'nl') {
            return this.getSpokenNLDate();
        }
        else {
            return this.getSpokenENDate();
        }
    };

    /**
     * Returns the spoken time for English language
     *
     * @returns {string}
     */
    this.getSpokenENTime = function() {
        // TODO: Fix this
        return 'implementation needed';
    };

    /**
     * Returns the spoken time for Dutch language
     *
     * @returns {string}
     */
    this.getSpokenNLTime = function() {
        var hour = this.date.getHours();
        var minutes = this.date.getMinutes();

        if (minutes == 0)
            minutes = '';

        var minuteTekst = 'minuten';
        if (minutes == 1 || minutes == 29 || minutes == 31 || minutes == 59)
            minuteTekst = 'minuut';

        if (hour > 12) {
            hour = hour - 12;
        }
        if (hour == 0) {
            hour = 12;
        }

        // Until 'kwart over'
        if (minutes <= 15) {
            if (minutes == 0) {
                return hour + " uur";
            }
            if (minutes == 15) {
                return " kwart over " + hour;
            }
            // 1 - 14
            else {
                return minutes + " " + minuteTekst + " over " + hour;
            }
        }
        // After 'kwart-over'
        else {
            // Add 1 to hour
            hour++;
            if (hour > 12) {
                hour = hour - 12;
            }

            if (minutes >= 16 && minutes <= 29) {
                return (30 - minutes) + " " + minuteTekst + " voor half " + hour;
            }
            if (minutes == 30) {
                return "half " + hour;
            }
            if (minutes >= 31 && minutes <= 44) {
                return (minutes - 30) + " " + minuteTekst + " over half " + hour;
            }
            if (minutes == 45) {
                return "kwart voor " + hour;
            }
            if (minutes >= 46 && minutes <= 59) {
                return (60 - minutes) + " " + minuteTekst +  " voor " + hour;
            }
        }
        return 'geen idee hoe laat het is..';
    };

    /**
     *
     * Spoken date in Dutch,
     * Donderdag 22 mei
     *
     * @returns {string}
     */
    this.getSpokenNLDate = function() {
        return this.getDayName(this.date.getDay()) +
            ", " + this.date.getDate() +
            " " + this.getMonthName(this.date.getMonth());
    };

    /**
     * Returns day-name
     *
     * @param {int} number
     * @returns {string}
     */
    this.getDayName = function(number) {
        if (number in this.dayNames)
            return this.dayNames[number];
        return number;
    };

    /**
     * Returns month-name
     *
     * @param {int} number
     * @returns {string}
     */
    this.getMonthName = function(number) {
        if (number in this.monthNames)
            return this.monthNames[number];
        return number;
    };
};
