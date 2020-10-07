import { getDateTime } from './myGetter'

function uuid() {
  const {
    date, month, year, hours, minutes, seconds
  } = getDateTime();

  const fullDate = year.concat(month, date)
  const fullTime = hours.concat(minutes, seconds)
  return [fullDate, fullTime].join('-')
}

export default uuid

