/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function boDau(str: string) {
    // Chuẩn hóa chuỗi Unicode về dạng NFD
    str = str.normalize("NFD");

    // Tạo một mảng chứa các ký tự dấu tiếng Việt
    const diacritics = [
        "á",
        "à",
        "ả",
        "ã",
        "â",
        "ạ",
        "ă",
        "ằ",
        "ẳ",
        "ẵ",
        "â",
        "ậ",
        "ä",
        "đ",
        "å",
        "æ",
        "ç",
        "é",
        "è",
        "ẻ",
        "ẽ",
        "ê",
        "ẹ",
        "ë",
        "í",
        "ì",
        "ỉ",
        "ĩ",
        "î",
        "ị",
        "ï",
        "ó",
        "ò",
        "ỏ",
        "õ",
        "ô",
        "ọ",
        "ơ",
        "ờ",
        "ở",
        "ỡ",
        "ô",
        "ợ",
        "ö",
        "ø",
        "œ",
        "ú",
        "ù",
        "ủ",
        "ũ",
        "ư",
        "ụ",
        "ü",
        "ý",
        "ỳ",
        "ỷ",
        "ỹ",
        "î",
        "ỵ",
        "ÿ",
    ];

    // Thay thế các ký tự dấu bằng ký tự không dấu tương ứng
    for (const diacritic of diacritics) {
        str = str.replace(
            diacritic,
            diacritic
                .replace("á", "a")
                .replace("à", "a")
                .replace("ả", "a")
                .replace("ã", "a")
                .replace("â", "a")
                .replace("ạ", "a")
                .replace("ă", "a")
                .replace("ằ", "a")
                .replace("ẳ", "a")
                .replace("ẵ", "a")
                .replace("â", "a")
                .replace("ậ", "a")
                .replace("ä", "a")
                .replace("å", "a")
                .replace("æ", "a")
                .replace("ç", "c")
                .replace("đ", "d")
                .replace("é", "e")
                .replace("è", "e")
                .replace("ẻ", "e")
                .replace("ẽ", "e")
                .replace("ê", "e")
                .replace("ẹ", "e")
                .replace("ë", "e")
                .replace("í", "i")
                .replace("ì", "i")
                .replace("ỉ", "i")
                .replace("ĩ", "i")
                .replace("î", "i")
                .replace("ị", "i")
                .replace("ï", "i")
                .replace("ó", "o")
                .replace("ò", "o")
                .replace("ỏ", "o")
                .replace("õ", "o")
                .replace("ô", "o")
                .replace("ọ", "o")
                .replace("ơ", "o")
                .replace("ờ", "o")
                .replace("ở", "o")
                .replace("ỡ", "o")
                .replace("ô", "o")
                .replace("ợ", "o")
                .replace("ö", "o")
                .replace("ø", "o")
                .replace("œ", "o")
                .replace("ú", "u")
                .replace("ù", "u")
                .replace("ủ", "u")
                .replace("ũ", "u")
                .replace("ư", "u")
                .replace("ụ", "u")
                .replace("ü", "u")
                .replace("ý", "y")
                .replace("ỳ", "y")
                .replace("ỷ", "y")
                .replace("ỹ", "y")
                .replace("î", "y")
                .replace("ỵ", "y")
                .replace("ÿ", "y"),
        );
    }

    // Trả về chuỗi đã bỏ dấu
    return str;
}
// Implement fuzzy search match for search bar
export default function fuzzyMatch(pattern: string, str: string) {
    // Make sure the pattern is a string
    let newPattern = String(pattern);
    let newStr = String(str);
    // Remove space in front and end of pattern and str
    newPattern = newPattern.trim();
    newStr = newStr.trim();
    // lowercase pattern and str
    newPattern = newPattern.toLowerCase();
    newStr = newStr.toLowerCase();
    // bo dau tieng viet
    newPattern = boDau(newPattern);
    newStr = boDau(newStr);
    // console.log(newPattern);
    // console.log(newStr);
    newPattern = `.*${newPattern.split("").join(".*")}.*`;
    // Add .* between each character in pattern
    const re = new RegExp(newPattern);
    return re.test(newStr);
}

const filterByUpdateAtRange = (data: any[], startDate: string, endDate: string) => {
    if (!data || !startDate || !endDate) return data;
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);

    return data.filter((item) => {
        const itemTimestamp = Date.parse(item.created_at);
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
    });
};

export const filterByTimeRange = (data: any[], range: string): any[] => {
    if (!range || !data) return data;
    const currentDate = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (range) {
        case "yesterday":
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - 1);
            endDate = new Date(currentDate);
            break;
        case "threeDays":
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - 3);
            endDate = new Date(currentDate);
            break;
        case "oneWeek":
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - 7);
            endDate = new Date(currentDate);
            break;
        case "oneMonth":
            startDate = new Date(currentDate);
            startDate.setMonth(currentDate.getMonth() - 1);
            endDate = new Date(currentDate);
            break;
        default:
            startDate = new Date(0); // Ngày bắt đầu từ 1/1/1970
            endDate = new Date(currentDate);
            break;
    }

    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();

    return filterByUpdateAtRange(data, startDateString, endDateString);
};

// convert iso string to date
export const convertIsoStringToDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
};

// Convert to currency format (ex: 1000000 => 1.000.000)
export const formatCurrency = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
};

// Format image url to get image from server
export const formatImageURL = (imageURL: string) => {
    return process.env.NEXT_PUBLIC_IMAGE_URL + imageURL;
};

// Convert date from "yyyy-mm-đ hh:mm:ss" to "dd/mm/yyyy"
export const convertDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

export const convertDateToServerFormat = (dateString: string) => {
    //* Input date format: DD/MM/YYYY, e.g. 28/02/2023
    //* Output date format: YYYY-MM-DD, e.g. 2023-02-28

    const parts = dateString.split("/");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Create a new Date object using the components
    const date = new Date(`${year}-${month}-${day}`);

    // Extract the components of the new date
    const convertedDay = String(date.getDate()).padStart(2, "0");
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const convertedYear = date.getFullYear();

    // Return the converted date in the "yyyy-mm-dd" format
    return `${convertedYear}-${convertedMonth}-${convertedDay}`;
};

// Convert date from 'dd/mm/yyyy' to 'mm/dd/yyyy'
export const convertDateToUSFormat = (dateString: string) => {
    const parts = dateString.split("/");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${month}/${day}/${year}`;
};
