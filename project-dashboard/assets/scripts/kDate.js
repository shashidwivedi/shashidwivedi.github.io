function kDate(date) {
    this.date = new Date(date);

    var dayFormats = ['dd','ddd','dddd','DDD','DDDD'];
    var monthFormats = ['mm','mmm','mmmm'];

    this.format = function (formatString = "dd/mm/yyyy") {

        var returnDateTime = function (numOfDelimeters, delSymbol, s1 = "" , s2 = "", s3 = "") {
            switch (numOfDelimeters) {
                case 2:
                    return s1 + delSymbol + s2 + delSymbol + s3;
                case 1: {
                    if (delSymbol == '/') return s2 + delSymbol + s3;
                    if (delSymbol == ':') return s1 + delSymbol + s2;

                }

                case 0: {
                    if (delSymbol == '/') return "Date";
                    if (delSymbol == ':') return "TIme";
                }
            }
        };

        var year = this.date.getFullYear();
        var month = this.date.getMonth() + 1;
        var date = this.date.getDate();

        var hours = this.date.getHours();
        // var ampm = hours > 12 ? 'PM' : 'AM';
        var seconds = this.date.getSeconds();
        // var hours = hours % 12;
        var minutes = this.date.getMinutes();

        var regexpDate = /\//gmi;
        var regexpTime = /\:/gmi;

        var delimetersDate = formatString.match(regexpDate);
        var delimetersTime = formatString.match(regexpTime);

        var numOfDelimetersDate = 0;
        var numOfDelimetersTime = 0;

        if (delimetersDate != null) {
            numOfDelimetersDate = delimetersDate.length;
            return returnDateTime(numOfDelimetersDate, '/', date, month, year);
        }

        if (delimetersTime != null) {
            numOfDelimetersTime = delimetersTime.length;
            return returnDateTime(numOfDelimetersTime, ':', hours, minutes, seconds);
        }

    }

}