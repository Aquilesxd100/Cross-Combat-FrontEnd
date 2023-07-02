function dropCrystal() : boolean {
    const dropChance : number = Math.random() * 100;
    if (dropChance <= 5) {
        return true;
    }
    return false;
};
export default dropCrystal;