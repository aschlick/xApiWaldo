var request = require('request');
var url = 'https://cloud.scorm.com/tc/JC0GVUS6EK/statements';
var user = 'llxrGeD-cAxyNGN-SZU';
var pass = 'fxqwHqxA5tGgkrOao8A';
var version = '1.0.0';

function getData(callback){
  request.get(url, {
    auth: {
      user: user,
      pass: pass
    },
    headers: {
      'X-Experience-API-Version': version
    }
  }, callback);
}

function groupBy( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group];
  })
}

function findStart(statement){
  return statement.verb.id === 'http://adlnet.gov/expapi/verbs/launched';
}
function findPictureHint(statement){
  return statement.object.definition.name['en-US'] === 'Picture Hint';
}
function findWordHint(statement){
  return statement.object.definition.name['en-US'] === 'Word Hint';
}
function findHint(statement){
  return findPictureHint(statement) || findWordHint(statement);
}
function notWaldo(statement){
  return statement.object.definition.name['en-US'] === 'not waldo';
}

getData(function(error, response, body){
  if(error){
    console.error('couldn\'t get data', error);
  }
  var data = JSON.parse(body).statements.sort(function(a,b){
    var aDate = new Date(a.timestamp);
    var bDate = new Date(b.timestamp);
    if(aDate > bDate) {
      return 1;
    } else if(aDate < bDate){
      return -1;
    }
    return 0;
  });
  console.log(data);
  var grouped = groupBy(data, function(i){
    return i.actor.account.name;
  });
  grouped.forEach(function(statements){
    var startTime = new Date(statements.find(findStart).timestamp);
    var wordHints = statements.filter(findWordHint);
    var pictureHInts = statements.filter(findPictureHint);
    var notWaldoClicks = statements.filter(notWaldo).length;
  });
});
