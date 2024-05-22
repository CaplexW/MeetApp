export default function stampToTime(timeStamp) {
  const diff = Date.now() - timeStamp;
  const sec = diff / 1000;
  if (sec > 60) {
    const min = sec / 60;
    if (min > 40) {
      const hour = min / 60;
      if (hour > 24) {
        const ruDate = Intl.DateTimeFormat('ru').format(timeStamp);
        const nowDate = Intl.DateTimeFormat('ru').format(Date.now());
        if (nowDate[nowDate.length - 1] === ruDate[ruDate.length - 1]) {
          const cutDate = ruDate.slice(0, 5);
          return cutDate;
        }
        return ruDate;
      }
      const date = new Date(timeStamp);
      const timeFormat = Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
      });
      return timeFormat.format(date);
    }
    return min;
  }
  return 1;
}
