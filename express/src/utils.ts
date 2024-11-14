import { NextFunction, Request, Response } from "express"

export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log(req, error)
            next(error); // Passes error to error handling middleware
        }
    };
};

export const lowercaseFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export const convertKeysToLowerCase = (obj: any) => {
    const output: any = {};
    if (Object.prototype.toString.apply(obj) !== '[object Object]' && Object.prototype.toString.apply(obj) !== '[object Array]') {
        return obj
    }
    for (const key in obj) {
        const val = obj[key]

        if (Object.prototype.toString.apply(val) === '[object Object]') {
            output[lowercaseFirstLetter(key)] = convertKeysToLowerCase(val);
        } else if (Object.prototype.toString.apply(val) === '[object Array]') {
            const lowerCase = lowercaseFirstLetter(key)
            output[lowerCase] = [];
            for (let j = 0; j < val.length; j++) {
                output[lowerCase].push(convertKeysToLowerCase(val[j]));
            }
        } else {
            output[lowercaseFirstLetter(key)] = val;
        }
    }
    return output;
};
