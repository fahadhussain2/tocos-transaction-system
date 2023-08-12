export const info = (...params: any[]) => {
    console.log(...params)
}

export const error = (...params: any[]) => {
    console.error(...params)
}

const logger = {
    info, error
}

export default logger;