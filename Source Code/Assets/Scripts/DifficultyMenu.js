var MTex : Texture2D;
var OptionsPrefab : Transform;
var activeCol : Color;
var hoverCol : Color;
var normalCol : Color;
var LabelCol : Color;
var backgroundColor : Color;
var font : Font;

var jukeboxName : String;
private var juke : JukeBox;
var clips : AudioClip[];
var clipnames : String[];

private var Bw : float;
private var Bw1 : float;
private var Bh : float;

private var Bx : float;

private var By1 : float;
private var By2 : float;
private var By3 : float;
private var By4 : float;

private var Lw : float;
private var Lh : float;
private var Lx : float;
private var Ly : float;

function Awake ()
	{
	
	juke = GameObject.Find(jukeboxName).GetComponent(JukeBox);
	 for(var i = 0; i < clips.Length; i++)
	 	{
	 	//juke.AddClip(clipnames[i], clips[i]);
	 	juke.Add(clipnames[i], clips[i]);
	 	}
	
	Lw = Screen.width * 14 / 24;
	Lx = Screen.width * 5 / 24;
	Lh = Screen.height * 1.5 / 18;
	Ly = Screen.height * 1 / 18;
	
	Bw = Screen.width * 18 / 24;
	Bh = Screen.height * 3.5 / 18;
	
	Bx = Screen.width * 3 / 24;
	
	By1 = Screen.height * 3.5 / 18;
	By2 = Screen.height * 8 / 18;
	By3 = Screen.height * 12.5 / 18;
	
	By4 = Screen.height * 6 / 18;
	Bw1 = Screen.width * 1.5 / 24;
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
	
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.skin.label.fontStyle = FontStyle.Bold;
	GUI.skin.label.normal.textColor = LabelCol;
	
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), MTex, ScaleMode.StretchToFill, false);
	GUI.Label(Rect(Lx, Ly, Lw, Lh), "Select Difficulty");
	if(GUI.Button(Rect(Bx, By1, Bw, Bh), "Need Balls?"))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("NumOfBalls", 4);

		}
	if(GUI.Button(Rect(Bx, By2, Bw, Bh), "Don't Know??"))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("NumOfBalls", 3);
		
		}
	if(GUI.Button(Rect(Bx, By3, Bw, Bh), "Got Balls???"))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("NumOfBalls", 2);
		
		}
	if(GUI.Button(Rect(0, By4, Bw1, By4), "<<"))
		{
		juke.Play(clipnames[0]);
		GameObject.Instantiate(OptionsPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}
	}