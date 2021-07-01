import { formatDate } from "@angular/common";

export class PetAddictDate {

    public static getHumanDate(time: Date): string {
        var secondBetweenTwoDate = Math.abs((new Date().getTime() - new Date(time).getTime()) / 1000);
        var minute = 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
        var fuzzy;
        if (secondBetweenTwoDate < 60) {
            fuzzy = 'maintenant.';
        } else if (secondBetweenTwoDate < 2 * minute) {
            fuzzy = 'il y\'a une minute.'
        } else if (secondBetweenTwoDate < hour) {
            fuzzy = Math.floor(secondBetweenTwoDate / minute);
            fuzzy = 'il y\'a ' + this.getDiff(time, 'mm') + ' minutes.'
        } else if (Math.floor(secondBetweenTwoDate / hour) == 1) {
            fuzzy = 'il y\'a une heure.'
        } else if (secondBetweenTwoDate < day) {
            fuzzy = 'il y\'a ' + this.getDiff(time, 'h') + ' heures.'
        } else if (secondBetweenTwoDate < day * 2) {
            fuzzy = 'hier ' + formatDate(time, 'HH:mm', 'fr');
        } else if (secondBetweenTwoDate < week) {
            fuzzy = formatDate(time, 'EEEE HH:mm', 'fr');
        } else {
            fuzzy = formatDate(time, 'd MMMM y HH:mm', 'fr');
        }
        return fuzzy;
    }

    private static getDiff(time: Date , format : string) : number{
        let old = Number(formatDate(time, format, 'fr'));
        let now = Number(formatDate(new Date(), format, 'fr'));
        return now - old;
    }

    public static getFormatedDate(date: Date): string {
        var secondBetweenTwoDate = Math.abs((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (secondBetweenTwoDate < 86400) {
            return formatDate(date, 'HH:mm', 'fr')
        } else {
            return formatDate(date, 'EEEE d MMMM y HH:mm', 'fr')
        }
    }


}