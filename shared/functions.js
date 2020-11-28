export function getHoursDiff (dateString) {
    const dateObject = new Date(dateString)
    const diffTime = Math.abs(new Date() - dateObject);

    if (isNaN(dateObject.getDate())) {
        return null
    }
    return Math.ceil(diffTime / (1000 * 60 * 60));
}

export function getStringDiff (dateString) {
    const diffHours = getHoursDiff(dateString)

    if (diffHours === null) {
        return null
    }
    else if (diffHours < 24) {
        return `${diffHours} hours ago`
    } else {
        return `${Math.ceil(diffHours / 24)} days ago`
    }
}