import React,{useEffect,useState} from 'react'

import {getCountryList} from '@/utils/addressConfig'

import { Select } from "antd";
const { Option } = Select;


export default function CountrySelect (props) {
  const {defaultCountry} =props
  const [value,setValue]=useState(defaultCountry)
  const [countryList,setCountryList] =useState([])

  useEffect(()=>{
    let countryList=getCountryList().concat([])
    setCountryList(countryList)
  },[])

  const selectCountry=(value)=>{
    setValue(value)
    props.countryChange(value)
  }

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      value={value}
      onChange={selectCountry}
      filterOption={(input, option) => {
        return option.children.indexOf(input) >= 0;
      }}
    >
      {
        countryList.map(item=>{
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          )
        })
      }
    </Select>
  );
}