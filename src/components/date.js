import React from 'react';
import '../assets/css/date.css';
import moment from "moment";

export default function date(props) {

  return <div className="date">{moment(props.since).fromNow()} - {moment(props.since).format('MMM DD, YYYY')} – {moment(props.to).format('MMM DD, YYYY')}</div>;
}