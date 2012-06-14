public var forceMax : float = 10;
public var forceMin : float = 0;
public var activeHeight : float = 0;
public var WindCamname : String;
private var WindCam : GameObject;
var LabelCol : Color;
var backgroundColor : Color;
var font : Font;
private var forceVal : float;

private var wdirx : float;
private var wdiry : float;
private var targetDir : Vector3;

function Awake ()
	{
	WindCam = GameObject.Find(WindCamname);
	if(WindCam){
	forceVal = Random.Range(forceMin, forceMax);
	wdirx = Random.Range(-1.0f, 1.0f);
	//wdiry = Random.Range(-1.0f, 1.0f);
	targetDir = Vector3(wdirx, 0, 0);
	targetDir = targetDir.normalized;
	WindCam.transform.eulerAngles.z = 180;
	if(wdirx > 0)
		WindCam.transform.eulerAngles.z = 0;
	//arr.transform.Rotate(0, 0, 0);
	//cam.transform.eulerAngles.z = -cam.transform.eulerAngles.z;
	print(forceVal);
	//print(transform.forward);
		}
	}

function Update () {
	if(transform.position.y < activeHeight)
		forceVal = 0;
	//cam.transform.Rotate(0, 0, Vector2.Angle(Vector2.zero, Vector2(wdirx, wdiry)));
	rigidbody.AddForce(targetDir * 20 * forceVal);
}

function OnGUI ()
	{
	if(WindCam){
		GUI.backgroundColor = backgroundColor;
	
	GUI.skin.font = font;
	
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.skin.label.fontStyle = FontStyle.Bold;
	GUI.skin.label.normal.textColor = LabelCol;
		GUI.Label(Rect(Screen.width * 0.5 / 24, Screen.height * 2 / 3, Screen.width * 3.5 / 24,Screen.height * 1.5 / 18), "W: " + forceVal + "");
		}
	}