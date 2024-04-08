export const LISTOFREQUEST: any = [];

export const randomNumber = (range: number): number => {
    return Math.floor(Math.random() * range) + 1;
}

export const giveRandomNumOrChar = () => {
    const arrOfChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const arrOfNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const randomNum = randomNumber(999);

    if (randomNum % 2 == 0) {
        return arrOfChar[randomNumber(arrOfChar.length - 1)];
    } else {
        return arrOfNum[randomNumber(arrOfNum.length - 1)];
    }
}


export const genrateRandomName = () => {
    const pre = "user";
    let post = "";
    const dash = "@";

    for (let i = 1; i <= 8; i++) {
        post += giveRandomNumOrChar();
    }

    return pre + dash + post;
}


export const delayTask = (methodForCall: () => void, delay: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(methodForCall());
        }, delay);
    });
};

export const convertTimeInActualFormat = (timestamps: string) => {
    const currentDate = new Date(timestamps);
    const hours = currentDate.getHours();
    const twelveHourFormat = hours % 12 || 12; // Convert hour to 12-hour format

    const currentHours = twelveHourFormat.toString().padStart(2, '0');
    const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const currentSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const currentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

    return currentTime;
}
