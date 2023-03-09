import * as dayjs from 'dayjs';
import { Period } from '../enums';

export const getDates = (startDate: any, endDate: any): Array<Date> => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());
  const dates = [];

  while (date <= end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getStartEndByPeriod = (period: Period): { startDate: Date; endDate: Date } => {
  let startDate: any = '';

  switch (period) {
    case Period.ONE_WEEK:
      startDate = dayjs().subtract(7, 'days');
      break;
    case Period.ONE_MONTH:
      startDate = dayjs().subtract(1, 'month');
      break;
    case Period.THREE_MONTH:
      startDate = dayjs().subtract(3, 'months');
      break;
    case Period.ONE_YEAR:
      startDate = dayjs().subtract(1, 'year');
      break;
    default:
      startDate = dayjs();
      break;
  }

  const endDate = dayjs().endOf('day').toDate();
  startDate = startDate.startOf('day').toDate();

  return { startDate, endDate };
};
