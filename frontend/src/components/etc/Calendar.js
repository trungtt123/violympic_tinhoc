import React, { useState, useEffect, useRef } from 'react';

export default function Calendar(props) {
    var arrYear = ["2021", "2022", "2023", "2024", "2025"];
    const examOpenTime = props.examOpenTime;
    const [selectedMon, setMon] = useState((examOpenTime === undefined) ? 1 : examOpenTime.month);
    const [selectedDay, setDay] = useState((examOpenTime === undefined) ? 1 : examOpenTime.day);
    const [selectedYear, setYear] = useState((examOpenTime === undefined) ? arrYear[0] : examOpenTime.year);

    const handleChangeMon = (e) => {
        setMon(e.target.value)
    }
    const handleChangeDay = (e) => {
        setDay(e.target.value)
    }
    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }

    useEffect(async () => {

        var time = {
            year: selectedYear,
            month: selectedMon,
            day: selectedDay,
        }
        props.callBackSaveTimeExam(time);
    },  [selectedYear, selectedMon, selectedDay]);
    return (
        <>
            <div className="calendar mt-2">
                <div>Chọn năm:
        <select onChange={handleChangeYear} value={selectedYear}>
                        {arrYear.map((item, index) => (
                            <option key={index + 1} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>Chọn tháng:
          <select onChange={handleChangeMon} value={selectedMon}>
                        {[...Array(12)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
                <div>Chọn ngày:
        <select onChange={handleChangeDay} value={selectedDay}>
                        {[...Array(new Date(selectedYear, selectedMon, 0).getDate())].map((_, index) => {

                            return <option key={index + 1} value={index + 1} selected={true}>{index + 1}</option>
                        })}
                    </select>
                </div>
                

            </div>
        </>

    );
};