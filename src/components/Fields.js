
import React from 'react'

const Fields = ({fields,index}) => {
    return (
        <tr>
            <th>{index}</th>
            <th>{fields.qualm}</th>
        </tr>
    )
}

export default Fields