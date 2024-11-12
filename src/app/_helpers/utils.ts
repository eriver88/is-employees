export function _contains(key: string, data: Array<any>): boolean {
  return data.indexOf(key) >= 0;
}

export function _contain_array(target:any, pattern: any) {
  let value = 0;
  pattern.forEach(function (word: any) {
    value = value + target.includes(word);
  });
  return (value === 1)
}

export function _currency(value: number|string): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(Number(value));
}
