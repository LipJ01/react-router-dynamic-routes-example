import React from 'react'
import Fields from './Fields'

const Data = ({data}) => {
    return data.map((fields,index)=>(
        <Fields fields={fields} key={index+1}
            index={index+1}
        />
    ))
}

export default Data