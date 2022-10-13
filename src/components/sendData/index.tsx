import { NextPage } from "next"
import React from "react";
import callApi from "../../app/helpers/callApi";

const SendData: NextPage = () => {

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        callApi().get('/userstimes').then((res) => {
            try {
                dataProcess(res?.data)
            } catch (error) {
                console.log(error);
            }
        });
    }


    const dataProcess = ({ users, times, lessons,computerGroup }: any) => {

        console.log("received data: ", { users, times, lessons,computerGroup });
        const computerGroupList = computerGroup.find((i :any)=> i.year == "1401").classes.split(",");
        const lessonsList: any = [];
        const initialchargedMinimumUsers = users.map((user: any) => ({ prsonalCode: user.personal_code, chargedMinimum: user.charged_minimum }));
        const initialLessons = lessons.map((lesson: any) => ({ ...lesson, picked: false }));
        const typeTimes = [
            { weekday: 'شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'یک شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'دو شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'سه شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'چهار شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'پنج شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
        ];
        computerGroupList.map((classNumber: string)=>{

            typeTimes.map(typeTime => {
                typeTime.times.map(period => {
                    //
                    typeTime.weekday;
                    period;
    
                    const fromTime = Number(period.split('-')[0].split(":")[0]) + Number((period.split('-')[0].split(":")[1] as any) * 0.01);
                    const toTime = Number(period.split('-')[1].split(":")[0]) + Number((period.split('-')[1].split(":")[1] as any) * 0.01);
    
                    users.map((user: any) => {
    
                        const userTimes = times.filter((time: any) => (time.personal_code == user.personal_code));
    
                        userTimes.map((userTime: any) => {
    
                            const fromUserTime = Number(userTime.first_time.split(":")[0]) + Number(userTime.first_time.split(":")[1] * 0.01);
                            const ToUserTime = Number(userTime.last_time.split(":")[0]) + Number(userTime.last_time.split(":")[1] * 0.01);
    
                            if (fromUserTime <= fromTime && ToUserTime >= toTime && userTime.weekday == typeTime.weekday) {
                                console.log(fromUserTime <= fromTime && ToUserTime >= toTime)
                                if (initialchargedMinimumUsers.find((i: any) => i.prsonalCode == user.personal_code).chargedMinimum > 0) {
                                    const userLessons = initialLessons.filter((lesson: any) => (lesson.personal_code == user.personal_code));
                                    if (userLessons.length > 0) {
                                        userLessons.map((l: any) => {
                                            if (!l.picked) {
                                                l.picked = true;
                                                const ch = initialchargedMinimumUsers.find((i: any) => i.prsonalCode == user.personal_code).chargedMinimum -= 3;
                                                lessonsList.push({ ...userLessons[0], weekday: typeTime.weekday, period, user, charged_min: ch,classNumber })
                                            }
                                        })
                                    }
                                }
    
                            }
                        })
                    })
    
                })
            })

        })

        console.log("processed data: ", lessonsList as any);
        console.log("finaly charged_min: ", initialchargedMinimumUsers);
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="submit"
                className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300'
                value={"دریافت اطلاعات از دیتابیس"}
            />
        </form>
    )

}

export default SendData;