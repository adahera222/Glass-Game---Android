
public var ulim : float = 20;
public var llim : float = 10;
private var cval : float;

public var speed : float = 0.1;
private var sign : int = 1;

function Awake ()
	{
	cval = transform.localPosition.y;
	ulim = cval + (ulim - llim)/2;
	llim = cval - (ulim - llim)/2;
	//cval = transform.position.y;
	}

function Update () {
	if(cval >= ulim)
		{sign = -1;}
	else if(cval <= llim)
		{sign = 1;}
	//transform.eulerAngles = Vector3(0, 0, 0);
	cval += sign * speed;
	transform.position.y = cval;
}