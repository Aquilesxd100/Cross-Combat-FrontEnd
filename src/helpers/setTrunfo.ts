function setTrunfo() : boolean {
    const chanceTrunfo : number = Math.floor(Math.random() * 100);
    if(chanceTrunfo <= 8) {
        return true;
    }
    return false;
};
export default setTrunfo;