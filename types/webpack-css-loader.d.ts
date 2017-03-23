declare module '*.css' {
    type classLookup = {
        [key: string]: string,
    }
    const content: classLookup;
    export default content;
}

declare module '*.scss' {
    type classLookup = {
        [key: string]: string,
    }
    const content: classLookup;
    export default content;
}