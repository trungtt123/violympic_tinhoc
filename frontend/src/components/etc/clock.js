import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { domain, api_url } from '../etc/constants';
function Clock(props) {
    var examTime = props.examTime;
    var isClickedStartExam = props.isClickedStartExam;
    const [clock, setClock] = useState();
    const handleClock = (interval) => {
        clearInterval(interval);
        var curClock = clock.split(":");
        var second = parseInt(curClock[2]);
        var minute = parseInt(curClock[1]);
        var hour = parseInt(curClock[0]);
        //console.log(hour + minute + second);
        if (hour + minute + second === 0) {
            props.examCallBackClockOutOfTime();
            return;
        }
        if (second === 0) {
            second = 59;

            if (minute === 0) {
                minute = 59;
                hour--;
            }
            else minute--;
        }
        else second--;
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;
        //console.log(hour + ":" + minute + ":" + second);

        setClock(hour + ":" + minute + ":" + second);

    }
    useEffect(() => {
        if (examTime === undefined) return;
        var totalHour = Number (examTime.selectedHour)
        var totalMinute = Number (examTime.selectedMinute)
        if (totalHour < 10) totalHour = '0' + totalHour;
        if (totalMinute < 10) totalMinute = '0' + totalMinute;
        setClock(totalHour + ":" + totalMinute + ":00");

    }, []);
    if (examTime === undefined) {
        return <>∞</>
    }
    else {
        if (clock !== undefined) {
            if (isClickedStartExam === true) {
                const interval = setInterval(() => {
                    handleClock(interval);
                }, 1000);
            }
        }
        return <>{clock}</>
    }
}
export default Clock;