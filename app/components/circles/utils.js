import R from 'ramda';

export function getRandom(max = 10) {
  const list = R.range(1, max);
  return list[Math.floor(Math.random() * list.length)];
}

export function getValue(data) {
  if (!data) return null;

  const { statik, dynamic } = data;

  return isStatic(data) ? statik.value : dynamic.value;
}

export function isStatic({ statik }) {
  return !R.isNil(statik.value);
}
