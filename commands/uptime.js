module.exports = async (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    client.util.embed(client, message, `I've been running for ${days} days, ${hours} hrs, ${minutes} mins and ${seconds} secs.`)
}