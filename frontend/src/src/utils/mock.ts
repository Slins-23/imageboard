export function randomRecentUploadTimestamp() {
    const now = Date.now();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const twoYearsAgoMS = twoYearsAgo.getTime();

    return Math.random() * (now - twoYearsAgoMS) + twoYearsAgoMS;
}
