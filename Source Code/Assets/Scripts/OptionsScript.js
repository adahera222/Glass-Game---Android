var MTex : Texture2D;
var MenuPrefab : Transform;
var DifficultyPrefab : Transform;
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

var BGSname : String;
private var BGS : GameObject;

private var ls : String = "On";
private var lv : String = "On";
//private var lsflag = false;
private var lvflag = false;

function Awake ()
	{
	if(PlayerPrefs.HasKey("Sound"))
		ls = PlayerPrefs.GetString("Sound");
	if(PlayerPrefs.HasKey("Vibration"))
		lv = PlayerPrefs.GetString("Vibration");
	BGS = GameObject.Find(BGSname);
	juke = GameObject.Find(jukeboxName).GetComponent(JukeBox);
	 for(var i = 0; i < clips.Length; i++)
	 	{
	 	//juke.AddClip(clipnames[i], clips[i]);
	 	juke.Add(clipnames[i], clips[i]);
	 	}
	}

function OnGUI()
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
	
	if(GUI.Button(Rect(0, Screen.height / 3, Screen.width / 16, Screen.height / 3), "<<"))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetString("Sound", ls);
		PlayerPrefs.SetString("Vibration", lv);
		
		GameObject.Instantiate(MenuPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}
	if(GUI.Button(Rect(Screen.width * 5 /24, Screen.height * 4 / 18, Screen.width * 10 / 24, Screen.height / 9), "Difficulty"))
		{
		juke.Play(clipnames[0]);
		GameObject.Instantiate(DifficultyPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}	
	if(GUI.Button(Rect(Screen.width * 5 /24, Screen.height * 8 / 18, Screen.width * 10 / 24, Screen.height / 9), "Sound"))
		{
		
		//lsflag = !lsflag;
		if(ls == "Off")
			ls = "On";
		else
			ls = "Off";
		
		PlayerPrefs.SetString("Sound", ls);
		juke.Play(clipnames[0]);
		if(ls == "Off")
			{
			BGS.GetComponent(BackgroundSound).Source1.audio.volume = 0;
			BGS.GetComponent(BackgroundSound).Source2.audio.volume = 0;
			}
		else
			{
			if(BGS.GetComponent(BackgroundSound).CurrentSourceActive == 1)
				{
				BGS.GetComponent(BackgroundSound).Source1.audio.volume = 1;
				BGS.GetComponent(BackgroundSound).Source2.audio.volume = 0;
				}
			else
				{
				BGS.GetComponent(BackgroundSound).Source1.audio.volume = 0;
				BGS.GetComponent(BackgroundSound).Source2.audio.volume = 1;
				}
			}
		}
	if(GUI.Button(Rect(Screen.width * 5 /24, Screen.height * 12 / 18, Screen.width * 10 / 24, Screen.height / 9), "Vibration"))
		{
		juke.Play(clipnames[0]);
		lvflag = !lvflag;
		if(!lvflag)
			lv = "On";
		else
			lv = "Off";
		PlayerPrefs.SetString("Vibration", lv);
		}
	GUI.Label(Rect(Screen.width * 17 /24, Screen.height * 8 / 18, Screen.width * 5 / 24, Screen.height / 9), ls);
	GUI.Label(Rect(Screen.width * 17 /24, Screen.height * 12 / 18, Screen.width * 5 / 24, Screen.height / 9), lv);
	}
	
	//9825635371