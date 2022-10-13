import React, { Dispatch, SetStateAction } from 'react'
import Item from './item'
type T = { id: number, data: { day: string, firstTime: string, lastTime: string, } };
interface Props { setTimeData: Dispatch<SetStateAction<T[]>>, timeData: T[],}

const Time: React.FC<Props> = ({ timeData, setTimeData }) => {

    const removeItem = (id: number) => { setTimeData(prev => (prev.filter(item => (item.id !== id)))) }
    const addItem = () => {
        setTimeData(prev => [...prev, { id: Date.now(), data: { day: 'شنبه', firstTime: "00:00", lastTime: "00:00", } }])
    }

    return (
        <div>
            <div className='flex items-center'>
                <div className='pl-3'>زمان</div>
                <div className='text-green-600 text-3xl cursor-pointer' onClick={addItem}>+</div>
            </div>
            <div className='max-h-48 overflow-auto'>
                {
                    timeData.map((item, index) => (
                        <Item key={item.id} itemProps={item} removeItem={removeItem} index={index} setTimeData={setTimeData} />
                    ))
                }
            </div>
        </div>
    )
}

export default Time;