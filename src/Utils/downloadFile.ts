



export default function downloadFile(file: Blob, filename: string): void{
    const anchor = document.createElement("a"); 

    const url = URL.createObjectURL(file);

    anchor.setAttribute("download", filename);
    anchor.setAttribute("href", url);

    anchor.click();
}