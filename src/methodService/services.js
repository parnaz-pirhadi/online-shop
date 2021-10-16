import React from 'react';

let Services = {

    convertNumberEnToFa(s) {
        if (s == null) return s;
        s = s.toString();
        var nums0 = "0|1|2|3|4|5|6|7|8|9".split("|");
        var nums = "۰|۱|۲|۳|۴|۵|۶|۷|۸|۹".split("|");
        var result = [];
        for (var i = 0; i < s.length; i++) {
            var ch = s.charAt(i);
            for (var ni = 0; ni < nums.length; ni++) {
                ch = ch.replace(nums0[ni], nums[ni]);
            }
            result.push(ch);
        }
        return result.join("");
    },

    formatNumber(value, direct) {
        if (value === null || value === "" || value === undefined || isNaN(value)) return;
        let trim = value.toString().replace(/,/g, "");
        const text = this.formatWithComma(
            3,
            // eslint-disable-next-line radix
            parseInt(this.convertNumberFaToEn(trim))
        );
        if (direct) return text;
        return (
            <span data-value={value}>
        {text}
      </span>
        );
    },
    formatWithComma(interval, num) {
        var digits = num.toString().split("");
        var output = [];

        digits.reverse().forEach(function (digit, index) {
            if (index && index % interval === 0) output.push(",");

            output.push(digit);
        });

        return output.reverse().map(this.convertNumberEnToFa).join("");
    },

    convertNumberFaToEn(s) {
        if (s == null) return s;
        s = s.toString();
        var nums = "0|1|2|3|4|5|6|7|8|9".split("|");
        var nums0 = "۰|۱|۲|۳|۴|۵|۶|۷|۸|۹".split("|");
        var result = [];
        for (var i = 0; i < s.length; i++) {
            var ch = s.charAt(i);
            for (var ni = 0; ni < nums.length; ni++) {
                ch = ch.replace(nums0[ni], nums[ni]);
            }
            result.push(ch);
        }

        return result.join("");
    },

};

export default Services;

