import React from 'react';
import s from './DateTime.module.scss';
import classNames from 'classnames';

interface Props {
    date:string,
}

const DateTime = ({date}:Props) =>{
    return (
      <div  className={classNames(s.dateTime)}>{date}</div>
    )
}

export default DateTime;