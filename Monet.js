// define schedule equivalents in select options

const scheduleSelectEqui = {

    'Answer Tasks': '01. Available/Case Work', 

    'First Break': '02. Break', 

    'Lunch': '03. Lunch',

    'Second Break': '02. Break',

    'TMM(-) Meeting - Team': '04. Meeting',

    'endOfShift': '10. End of shift'

}

const scheduleSelectIndex = {

    'Answer Tasks': 0, //'01. Available/Case Work', 

    'First Break': 1, //'02. Break', 

    'Lunch': 2, //'03. Lunch',

    'Second Break': 1, //'02. Break',

    'TMM(-) Meeting - Team': 3, //'04. Meeting',

    'endOfShift': 9, //'10. End of shift'   

}
 
/* +1 is used to allow easy use of the format without major manipuation

new Date("2024-04-16T00:00:00.000Z") */

//const todayTimestampAt12Plus1 = new Date(Date.now()).setHours(1,0,0,0);
 
//new Date.now().toISOString();

// Expected output: "2011-10-05T14:48:00.000Z"

//const twelveAM = new Date(todayIso.split('T')[0]);

//console.log('now timestamp', Date.now());

//console.log('estimated date', new Date("2024-04-16T00:00:00.000Z"));

//console.log('estimated timestamp', new Date("2024-04-17T00:00:00.000Z").getTime());

//console.log('todayTimestampAt12Plus1', todayTimestampAt12Plus1);

//console.log('toISOString', new Date(Date.now()).toISOString());

//console.log('twelveAM', twelveAM.toISOString());
 
let shiftIsEnded = false; // clear timer once boolean is true.

const scheduleElement = document.querySelectorAll('#daySchedule #activities div');

//console.log('scheduleElement', scheduleElement);
 
const scheduleChecker = (runScheduler) => {        

    const today = Date.now() + (1000 * 60 * 60);

    const todayISO = new Date(today).toISOString() //2024-04-16T14:52:00.892Z

    const currentStatusContainer = document.querySelector('#manualStatusChangeContainer section .manualStatusChangeStatus');

    const currentStatus = currentStatusContainer&&currentStatusContainer.innerText.trim();

    const eventTimeFormat = (exactTime) =>new Date(todayISO.split('T')[0] +"T"+ exactTime.trim() + ':00.000Z').getTime();

    if (currentStatus) {

        // check that shift is not ended 

          //CONTrol conditional... Confirm shift is truly ended, if not reverse this

        if (shiftIsEnded && runScheduler &&

            scheduleSelectEqui['endOfShift'] === currentStatus) {

            if (today > eventTimeFormat('17:00')) {

                clearInterval(runScheduler); // cancel timeloop

                console.log('Shutdown Script Time:', new Date(today + 5000).toISOString());

                // logout

                setTimeout(()=>{

                    const logoutButton = document.querySelector('#mainHeader a#btnLogout');

                    if (logoutButton) logoutButton.click();   

                }, 5000); //call after 5sec

                return;

            }

            else shiftIsEnded = false;

        }

        else

        scheduleElement.forEach(container =>{

            const eventDescription = container.querySelector('.eventDescription').innerText.trim();

            const eventTime = container.querySelector('.eventTime').innerText.trim();

            // time format: new Date("2024-04-16T00:00:00.000Z").getTime()

            //console.log('eventDescription', eventDescription);

            //console.log('eventTime', eventTime);

            const timeDuration = eventTime.split('-'); // ['09:00 ',' 09:15']

            //current iteration

            const currentSchedule = [eventTimeFormat(timeDuration[0]), eventTimeFormat(timeDuration[1])];

            const selectList = document.querySelector('select#statusListCombo');

            const submitButton = document.querySelector('button#submitmanualStatusChange');

            //console.log('selectList', selectList);

            //console.log('selectList selectedIndex', selectList.selectedIndex);

            //console.log('currentStatus', currentStatus);

            //console.log('submitButton', submitButton);

            //console.log('currentSchedule', currentSchedule);

            //console.log('today', today);

            //console.log('todayISO', todayISO);

            //console.log('Current Time', new Date(today).toISOString());

            //console.log('before', new Date(currentSchedule[0]).toISOString());

            //console.log('after', new Date(currentSchedule[1]).toISOString());

            //console.log(scheduleSelectEqui[eventDescription] !== currentStatus);

            // check against current time

            if (today >= currentSchedule[0] && today < currentSchedule[1]

&& scheduleSelectEqui[eventDescription] !== currentStatus) {

                // change status in select list options

                selectList['selectedIndex'] = scheduleSelectIndex[eventDescription];

                // submit click 

                if (submitButton) submitButton.click();

                console.log('Current Time:', new Date(today).toISOString());

                console.log('Before:', new Date(currentSchedule[0]).toISOString());

                console.log('After:', new Date(currentSchedule[1]).toISOString());

                console.log(`The ultimate goal is to provide cloud solutions to creatives,

                and media professionals. If you have an idea worth sharing,

                Holla at your guy!`);

            } // Signout if time is 5pm or greater

            else if (today >= eventTimeFormat('17:00')){

                selectList['selectedIndex'] = scheduleSelectIndex['endOfShift'];

                // submit click 

                if (submitButton) submitButton.click();

                shiftIsEnded = true;

                console.log('End of Day:', new Date(today).toISOString());

            }

        })

    }

}
 
// run state check every 5mins

if (scheduleElement){

    console.log('Hello, initializing...')

    scheduleChecker(); //initial run

    const runScheduler = setInterval(() => {

        console.log("Checking state!!!");

        scheduleChecker(runScheduler);

    }, 1000 * 30); // 30sec

}
