var tins : GameObject[];
var count : int = 0;

function Awake ()
	{
	tins = GameObject.FindGameObjectsWithTag("tin");
	}
function Update () {
	count = 0;
	for(var i = 0; i < tins.length; i++)
		if(tins[0])
			{count ++;}
	print(count);
}