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
            fuzzy = 'il y\'a ' + this.getDiffMinutes(secondBetweenTwoDate) + ' minutes.'
        } else if (Math.floor(secondBetweenTwoDate / hour) == 1) {
            fuzzy = 'il y\'a une heure.'
        } else if (secondBetweenTwoDate < day) {
            fuzzy = 'il y\'a ' + this.getDiffHours(secondBetweenTwoDate) + ' heures.'
        } else if (secondBetweenTwoDate < day * 2) {
            fuzzy = 'hier ' + formatDate(time, 'HH:mm', 'fr');
        } else if (secondBetweenTwoDate < week) {
            fuzzy = formatDate(time, 'EEEE HH:mm', 'fr');
        } else {
            fuzzy = formatDate(time, 'd MMMM y HH:mm', 'fr');
        }
        return fuzzy;
    }

    private static getDiffMinutes(time) : number{        
        return Math.floor(time/60);
    }
    private static getDiffHours(time) : number{        
        return Math.floor(time/60/60);
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