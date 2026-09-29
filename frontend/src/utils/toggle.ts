export const toggleId = (id: number, setState: React.Dispatch<React.SetStateAction<number[]>>) => {
    setState(prev => 
        prev.includes(id)
            ? prev.filter(dataId =>  dataId !== id)
            : [...prev, id]
    );
};

export const toggleBoolean = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState((prev) => !prev);
};