private var cam : Transform;
public var camname : String;
function Awake ()
	{cam = GameObject.Find(camname).GetComponent(Transform);
	}
function Update () {
	if((transform.position.y < -2) || (Vector3.Distance(transform.position, cam.position) > 45))
		Destroy(gameObject);
}