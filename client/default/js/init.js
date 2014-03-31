/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger 
loading the local config and binding a click event to invoke the cloud action 
call which will return the remote config.
*/

$fh.ready(function() {
  document.getElementById('run_button').onclick = function() {

  console.log(document.getElementById("sqlquery").value);

  $fh.act(
    {
      act:'mysql',
      req: {
                'query': document.getElementById("sqlquery").value
           }
    },
    function(res) {
      document.getElementById('sqlResults').innerHTML = JSON.stringify(res.rows);
    },
    function(code,errorprops,params) {
      console.log('An error occured: ' + code + ' : ' + errorprops.error);
      document.getElementById('sqlResults').innerHTML = 'An error occured: ' + code + ' : ' + errorprops.error;
    }
  );
};
});