function randomStatus() {
    const randomNumber = Math.round(Math.random());
    if (randomNumber === 0) {
        return false;
    } else if (randomNumber === 1) {
        return true;
    }
}


export default randomStatus;