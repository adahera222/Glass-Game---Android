var MTex : Texture2D;
var LevelPrefab : Transform;
var OptionsPrefab : Transform;
var activeCol : Color;
var hoverCol : Color;
var normalCol : Color;
var backgroundColor : Color;
var font : Font;

var jukeboxName : String;
private var juke : JukeBox;
var clips : AudioClip[];
var clipnames : String[];

private var Bx : float;
private var Bw : float;
private var Bh : float;
private var By1 : float;
private var By2 : float;
private var By3 : float;
private var By4 : float;

private var quitflag = false;


function Awake ()
	{
	juke = GameObject.Find(jukeboxName).GetComponent(JukeBox);
	 for(var i = 0; i < clips.Length; i++)
	 	{
	 	//juke.AddClip(clipnames[i], clips[i]);
	 	juke.Add(clipnames[i], clips[i]);
	 	}
	Bx = Screen.width * 2 / 24;
	Bw = Screen.width * 9 / 24;
	Bh = Screen.height * 2.5 / 18;
	By1 = Screen.height * 5 / 18;
	By2 = Screen.height * 8 / 18;
	By3 = Screen.height * 11 / 18;
	By4 = Screen.height * 14 / 18;
	}

/*function Update () {
}*/

function OnGUI ()
	{
	GUI.backgroundColor = backgroundColor;
	
	GUI.skin.font = font;
	GUI.skin.button.alignment = TextAnchor.MiddleCenter;
	GUI.skin.button.active.textColor = activeCol;
	GUI.skin.button.normal.textColor = normalCol;
	GUI.skin.button.hover.textColor = hoverCol;
	
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), MTex, ScaleMode.StretchToFill, false);
	
	
	if(quitflag)
	{
	
	GUI.Box(Rect(Screen.width / 12, Screen.height / 6, Screen.width * 5 / 6, Screen.height * 5 / 9),"EXIT");
	GUI.Label(Rect(Screen.width * 3.5 / 24, Screen.height / 4, Screen.width * 17 / 24, Screen.height * 5 / 18), "ARE YOU SURE?");
	
	if(GUI.Button(Rect(Screen.width * 3.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "YES"))
		{
		//juke.Play(clipnames[0]);
		juke.Play(clipnames[0]);
		Application.Quit();
		}
	if(GUI.Button(Rect(Screen.width * 15.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "NO"))
		{
		juke.Play(clipnames[0]);
		quitflag = false;
		}
	}
	else
		{
	if(GUI.Button(Rect(Bx, By1, Bw, Bh), "Start"))
		{print(clipnames[0]);
		juke.Play(clipnames[0]);
		
		GameObject.Instantiate(LevelPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}
	if(GUI.Button(Rect(Bx, By2, Bw, Bh), "Options"))
		{
		print(clipnames[0]);
		juke.Play(clipnames[0]);
		GameObject.Instantiate(OptionsPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}
	if(GUI.Button(Rect(Bx, By3, Bw, Bh), "Exit"))
		{print(clipnames[0]);
		juke.Play(clipnames[0]);
		//Application.Quit();
		quitflag = !quitflag;
		}
	}
	/*if(GUI.Button(Rect(Bx, By4, Bw, Bh), "Exit"))
		{
		Application.Quit();
		}*/
	}