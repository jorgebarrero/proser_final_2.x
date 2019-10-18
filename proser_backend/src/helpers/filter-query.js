
const array = [
  {id: 1, name: jorge},
  {id: 2, name: jose},
  {id: 1, name: juan},
];


let field = 'id_agent';


function filterToSql(array, field) {
  let resultado = '';

  if( array && field){

    let temp = array
      .map( x => {
        return 'OR' + field + ' = ' + x.id;
      });
  }


  return result;
}


let query = filterToSql(array, field);

console.log('query', query);
