/* eslint-disable no-underscore-dangle */
export default function getElementById(id, list) {
  if (Array.isArray(list)) {
    const [element] = list.filter((item) => item._id === id);
    return element;
  }
  const [element] = Object.values(list).filter((item) => item._id === id);
  return element;
}
