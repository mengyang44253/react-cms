import { COUNTRYLIST } from "./counrty";
import { CITYLIST } from "./city";

//中文排序
function sortListZh(list) {
  let array = list.concat([]);
  let resultArray = array
    .filter((it) => it.id !== 1)
    .sort((param1, param2) => {
      return param1.name_zh.localeCompare(param2.name_zh, "zh");
    });
  resultArray.unshift(array[0]);
  return resultArray;
}

//根据语言获取国家列表
export function getCountryList(locale = "zh") {
  let _countryList = [].concat(COUNTRYLIST);
  if (locale === "zh") {
    let arr = sortListZh(_countryList);
    arr.forEach((item) => {
      item.name = item.name_zh;
    });
    return arr;
  }
}

//获取城市列表
export function getCityListByCountryId(countryId, locale = "zh") {
  let currentList = CITYLIST.filter((item) => {
    return item.country_id === countryId;
  });
  if (locale === "zh") {
    currentList.forEach((item) => {
      item.name = item.name_zh;
      item.id = parseInt(item.id);
    });
    return currentList;
  }
}

//根据国家字段获取国家id
export function getCountryIdByName(name, locale = "zh") {
  if (!name) return "";
  let id = "";
  if (name) {
    let counrty = COUNTRYLIST.find((item) => {
      return item[`name_${locale}`] === name;
    });
    if (counrty) id = counrty.id;
  }
  return id;
}

//根据国家id获取国家name
export function getCountryNameById(id, locale = "zh") {
  if (!id) return "-";
  let current = COUNTRYLIST.find((item) => item.id === id);
  if (current) {
    return current[`name_${locale}`];
  } else {
    return "-";
  }
}

//根据城市名字获取城市id
export function getCityIdByName(name, locale = "zh") {
  if (!name) return "-";
  let current = CITYLIST.find((item) => item[`name_${locale}`] === name);
  if (current) {
    return current.id;
  } else {
    return "-";
  }
}

//根据城市id获取城市名
export function getCityNameById(id, locale = "zh") {
  if (!id) return "-";
  let current = CITYLIST.find((item) => item.id === id);
  if (current) {
    return current[`name_${locale}`];
  } else {
    return "-";
  }
}
