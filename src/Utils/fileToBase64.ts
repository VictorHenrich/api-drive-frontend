


export default function fileToBase64(file: Blob | File): Promise<string>{
    return new Promise((resolve, reject) => {
        const reader: FileReader = new FileReader();

        reader.readAsBinaryString(file);

        reader.addEventListener('load', () =>{
            let buffer: string = `${reader.result}`;

            resolve(btoa(buffer));
        });

        reader.addEventListener('error', (error) => {
            reject(error);
        })
    });
}