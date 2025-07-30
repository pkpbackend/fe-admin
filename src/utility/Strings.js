function filterValueOnlyFloat(value) {
  if (value) {
    return value
      ?.toString()
      .replace(/[^0-9.,]/g, "")
      .replace(/\.{2,}/g, ",")
      .replace(/\.,/g, ",")
      .replace(/\./g, ",")
      .replace(/,\./g, ",")
      .replace(/,{2,}/g, ",")
      .replace(/\.[0-9]+\./g, ",");
  }
  return "";
}

function convertCommaToDot(value) {
  if (value) {
    return value
      ?.toString()
      .replace(/[^0-9.,]/g, "")
      .replace(/\.{2,}/g, ".")
      .replace(/\.,/g, ".")
      .replace(/,/g, ".")
      .replace(/,\./g, ".")
      .replace(/,{2,}/g, ".")
      .replace(/\.[0-9]+\./g, ".");
  }
  return "";
}

function isNullOrEmpty(data, checkWhiteSpace = false) {
  return (
    data === null ||
    data === undefined ||
    data === "" ||
    (checkWhiteSpace && this.isOnlyWhiteSpace(data))
  );
}

function isOnlyWhiteSpace(data) {
  return data.replace(/ /g, "") === "";
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function getArrayKosong() {
  return [null, undefined, "null", "undefined"];
}

function cutString(string, length) {
  let result = string.split("");
  if (result.length > length) {
    result = result.slice(0, length);
    result = result.join("") + " ...";
  }
  return result;
}
function localizeNumber(n, separator = ",") {
  return n?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, separator) || "0";
}
const Strings = {
  filterValueOnlyFloat,
  convertCommaToDot,
  isOnlyWhiteSpace,
  isNullOrEmpty,
  ValidateEmail,
  getArrayKosong,
  cutString,
};

export default Strings;
export {
  filterValueOnlyFloat,
  convertCommaToDot,
  isOnlyWhiteSpace,
  isNullOrEmpty,
  ValidateEmail,
  getArrayKosong,
  cutString,
  localizeNumber,
};

export const toCapitalize = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
