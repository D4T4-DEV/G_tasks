

function createNotification(icon, title, msg) {
    var alert = {
        icon: icon,
        title: title,
        msg: msg
    }
    return alert;
}

function extractDataNotification(data) {
    var alert = {
        icon: data.icon,
        title: data.title,
        msg: data.msg
    }
    return alert;
}

module.exports = {
    createNotification,
    extractDataNotification
}