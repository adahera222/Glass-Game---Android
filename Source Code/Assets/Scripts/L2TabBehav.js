
public var ulim : float = 20;
public var llim : float = 10;
public var cval : float = 15;

public var speed : float = 0.1;
public var enabledflag = true;
private var sign : int = 1;

function Awake ()
	{
	transform.position.y = cval;
	//cval = transform.position.y;
	}

function Update () {
	if(!enabledflag)
		return;
	if(cval >= ulim)
		{sign = -1;}
	else if(cval <= llim)
		{sign = 1;}
	//transform.eulerAngles = Vector3(0, 0, 0);
	cval += sign * speed;
	transform.position.y = cval;
}