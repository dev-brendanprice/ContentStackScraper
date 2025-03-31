import { startPagination } from './startPagination.js';

function getNextInterval() {

    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0-6,Sun-Sat
    const publishDays = [4];

    // thursday and between 12pm - 11pm
    if (publishDays.includes(day) && hour >= 12 && hour < 23) {
        return 1000 * 60 * 5; // 5 mins
    } else {
        return 1000 * 60 * 45; // 45 mins
    };
};

function startTaskScheduler() {

    let interval;
    function scheduleNextRun() {

        const timeNow = new Date();
        interval = getNextInterval();
        console.log(`[${timeNow}] Scheduled: ${interval / (60 * 1000)} mins`);

        setTimeout(() => {
            startPagination();
            scheduleNextRun();
        }, interval);
    };

    // paginate immediately
    startPagination();
    scheduleNextRun();
};
startTaskScheduler();