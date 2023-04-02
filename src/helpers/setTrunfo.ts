function setTrunfo() : boolean {
    const chanceTrunfo : number = Math.floor(Math.random() * 100);
    if(chanceTrunfo <= 8) {
        return true;
    }
    console.log("CHANCE TRUNFO: " + chanceTrunfo)
    return false;
};
export default setTrunfo;