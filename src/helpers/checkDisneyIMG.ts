async function checkDisneyIMG(url : string) {
    return new Promise(resolve => {
        const img : any = new Image();
        if(!url) {
            resolve(false);
        };
        img.src = url;
        img.onload = function() {
            if((this.naturalWidth === 200 && this.naturalHeight === 114) || (this.naturalWidth === 200 && this.naturalHeight === 200)) {
                resolve(false);
            }
            resolve(true);
          }
    })
};
export default checkDisneyIMG;