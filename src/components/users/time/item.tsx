import React, { Dispatch, SetStateAction, useState } from 'react'

type T = { id: number, data: { day: string, firstTime: string, lastTime: string, } };
interface Props { removeItem: (id: number) => void, index: number, itemProps: T, setTimeData: Dispatch<SetStateAction<T[]>> }
const Item: React.FC<Props> = ({ removeItem, itemProps, index, setTimeData }) => {

    const [timesValue, setTimesValue] = useState({ fromHour: '00', fromMinute: '00', toHour: '00', toMinute: '00' });
    const changeHandlerTimes = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        let chnegedValue = (isNaN(Number(event.target.value))) ? "00" : event.target.value.substring(0, 2);
        setTimesValue(prev => ({ ...prev, [name]: chnegedValue }));
        let chnegedValueData = Number(chnegedValue) < 10 ? ("0" + Number(chnegedValue)) : chnegedValue;
        setTimeData((prev: any) => (
            prev.map((item: T) => item.id === itemProps.id ?
                {
                    ...item, data: {
                        ...item.data,
                        firstTime: (
                            (name === 'fromHour' ? chnegedValueData : timesValue.fromHour) + ":" +
                            (name === 'fromMinute' ? chnegedValueData : timesValue.fromMinute)
                        ),
                        lastTime: (
                            (name === 'toHour' ? chnegedValueData : timesValue.toHour) + ":" +
                            (name === 'toMinute' ? chnegedValueData : timesValue.toMinute)
                        )
                    }
                } : item)
        ));
    }

    const changeHandlerDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const arr = ["شنبه", "یک شنبه", "دو شنبه", "سه شنبه", "چهار شنبه", "پنج شنبه"];
        let day = arr[Number(event.target.value)];
        setTimeData((prev: any) => (prev.map((item: T) => item.id === itemProps.id ? { ...item, data: { ...item.data, day: day } } : item)))
    }
    return (
        <>
            <div>
                <div className='flex items-center flex-wrap border-b-2'>
                    <div className='flex items-center'>
                        <label htmlFor="days">انتخاب روز هفته</label>
                        <select id="days" onChange={(e) => { changeHandlerDay(e) }}
                            className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="0">شنبه</option>
                            <option value="1">یک شنبه</option>
                            <option value="2">دو شنبه</option>
                            <option value="3">سه شنبه</option>
                            <option value="4">چهار شنبه</option>
                            <option value="5">پنج شنبه</option>
                        </select>
                    </div>
                    <div className='flex items-center' >
                        <label htmlFor="fromTime">از ساعت </label>
                        <div dir='ltr' className="m-2 dark:text-black appearance-none block border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <input type="text" id="fromTime" name="fromTime" className='focus:outline-none px-3 py-2 w-12 rounded-md ' value={timesValue.fromHour} onChange={(e) => { changeHandlerTimes(e, 'fromHour') }} />
                            <span className="px-2">:</span>
                            <input type="text" className='focus:outline-none px-3 py-2 w-12 rounded-md ' value={timesValue.fromMinute} onChange={(e) => { changeHandlerTimes(e, 'fromMinute') }} />
                        </div>
                    </div>
                    <div className='flex items-center' >
                        <label htmlFor="toTime">تا ساعت </label>
                        <div dir='ltr' className="m-2 dark:text-black appearance-none block border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <input type="text" id="toTime" name="toTime" className='focus:outline-none px-3 py-2 w-12 rounded-md ' value={timesValue.toHour} onChange={(e) => { changeHandlerTimes(e, 'toHour') }} />
                            <span className="px-2">:</span>
                            <input type="text" className='focus:outline-none px-3 py-2 w-12 rounded-md ' value={timesValue.toMinute} onChange={(e) => { changeHandlerTimes(e, 'toMinute') }} />
                        </div>
                    </div>
                    <div className={`text-red-600 cursor-pointer text-3xl`} onClick={() => { removeItem(itemProps.id as number) }}>-</div>
                </div>
            </div>
        </>
    )
}

export default Item;