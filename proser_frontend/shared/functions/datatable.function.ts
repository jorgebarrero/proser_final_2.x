export function getUpdateFilter(string, rows, rows_original, field){
  let result = null;
  const val = string.toLowerCase();
  result = rows_original.filter(function(d) {
    typeof d[field] !== 'string' ? d[field] = String(d[field]) : d[field] = (d[field]);
    return d[field] ? d[field].toLowerCase().indexOf(val) !== -1 || !val : "";
  });
  return result;
}
