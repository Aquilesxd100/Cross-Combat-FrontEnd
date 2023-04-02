async function checkValidImg(url : string) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function() {
        if(this.readyState == this.DONE) {
            console.log(this.response.byteLength)
        }
    }
    xhr.send(null);
};
export default checkValidImg;