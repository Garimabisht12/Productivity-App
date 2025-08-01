import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import 'react-date-picker/dist/DatePicker.css';
// import { FaCheck } from 'react-icons/fa';


const HabitTracker = ({ habit }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [completedDates, setCompletedDates] = useState([])

    const toggleDate = (date) => {
        console.log(date)
        const dateStr = date.toDateString(); // Normalized for comparison

        setCompletedDates((prev) =>

            prev.includes(dateStr)
                ? prev.filter((d) => d !== dateStr) // Uncheck
                : [...prev, dateStr] // Check
        );


    };
    // console.log(completedDates)

    return (
        <>
            <div className=" rounded-lg  scale-60 p-4">
                <h2 className='text-2xl text-center font-semibold text-[1.9rem] capitalize text-[#23afb9] mb-4'>{habit}</h2>
                <Calendar
                    className="rounded-lg shadow-md   p-4"
                    minDate={new Date(2024, 0, 1)} maxDate={new Date(2025, 11, 31)}
                    onClickDay={toggleDate}
                    onChange={setSelectedDate}

                    tileClassName={({ date, view }) => {
                        // 0 = Sunday, 6 = Saturday
                        const isCompleted = completedDates.includes(date.toDateString());
                       
                        if (view === 'month') {
                            let className = ' flex justify-center items-center mx-auto ';

                            if (isCompleted) {
                                className += '!bg-[#00b4d8] !text-white';
                            }
                            return className;
                        }
                        return '';
                    }}

                    value={selectedDate}
                />
            </div>
        </>
    )
}

export default HabitTracker