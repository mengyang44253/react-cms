import React,{useState,useEffect} from "react";

import {getCityListByCountryId} from '@/utils/addressConfig'

import {Select} from 'antd'
const { Option } = Select;

export default function CitySelect(props){
	const {defaultCity,countryId} =props
	const [disabled,setDisabled]=useState(false)


	const [value,setValue]=useState(defaultCity)

	const selectCity=(value)=>{
		setValue(value)
		props.cityChange(value)
	}

	const [cityList, setCityList] = useState([])
	useEffect(()=>{
		if (countryId) {
			setDisabled(false)
		}else{
			setDisabled(true)
		}
		if (!countryId) {
			return
		}
		setCityList(getCityListByCountryId(countryId))
	},[countryId])


	return (
		<Select showSearch  disabled={disabled} onChange={selectCity} style={{ width: '100%' }} value={value} filterOption={(input,option)=>{
			return option.children.indexOf(input)>=0
		}}>
			{
				cityList.map(item=>{
					return (
						<Option key={item.id} value={item.id}>{item.name}</Option>
					)
				})
			}
		</Select>
	)
}