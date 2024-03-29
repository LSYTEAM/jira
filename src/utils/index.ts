import { useEffect, useState } from "react";


export const isFalsy = (value: unknown) => value === 0 ? false : !value

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {

        //@ts-ignore
        const value = result[key];
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key];
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}
//后面用泛型来规范类型
export const useDebounce = <D>(value: D, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timedebounced = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timedebounced);
    })

    return debouncedValue;
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}