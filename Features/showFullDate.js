import { getDateTime } from './myGetter'
function showFullDate() {
  const { date, month, year } = getDateTime()
  return `${date}/${month}/${year}`
}
export { showFullDate }