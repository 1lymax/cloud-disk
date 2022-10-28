export default (size: number, onlyunits: boolean = false) => {
    if (size > 1024 * 1024 * 1024) {
        return onlyunits ? ' Gb' : (size/(1024*1024*1024)).toFixed(1)+' Gb'
    }
    if (size > 1024 * 1024) {
        return onlyunits ? ' Mb' : (size/(1024*1024)).toFixed(1)+' Mb'
    }
    if (size > 1024) {
        return onlyunits ? ' Kb' : (size/(1024)).toFixed(1)+' Kb'
    }
    return onlyunits ? ' B' : size+'B'
};