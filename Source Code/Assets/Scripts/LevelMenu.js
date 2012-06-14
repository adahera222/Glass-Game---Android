var MTex : Texture2D;
var MenuPrefab : Transform;
//var DifficultyPrefab : Transform;

var activeCol : Color;
var hoverCol : Color;
var normalCol : Color;
var backgroundColor : Color;
var font : Font;

var jukeboxName : String;
private var juke : JukeBox;
var clips : AudioClip[];
var clipnames : String[];

private var Bw : float;
private var Bw1 : float;
private var Bh : float;

private var Bx1 : float;
private var Bx2 : float;
private var Bx3 : float;
private var Bx4 : float;

private var By1 : float;
private var By2 : float;
private var By3 : float;
private var By4 : float;

private var sc : String[] = new String[3]; 

function Awake ()
	{
	for(var i = 0; i < 3; i++)
		{
		if(PlayerPrefs.HasKey("HighScore" + (i+1) ))
			sc[i] = " \nHS: " + PlayerPrefs.GetInt("HighScore" + (i+1) );
		else
			sc[i] = "";
		}
	juke = GameObject.Find(jukeboxName).GetComponent(JukeBox);
	 for(i = 0; i < clips.Length; i++)
	 	{
	 	//juke.AddClip(clipnames[i], clips[i]);
	 	juke.Add(clipnames[i], clips[i]);
	 	}
	
	Bw = Screen.width * 4 / 24;
	Bh = Screen.height * 4 / 18;
	Bx1 = Screen.width * 2.5 / 24;
	Bx2 = Screen.width * 7.5 / 24;
	Bx3 = Screen.width * 12.5 / 24;
	Bx4 = Screen.width * 17.5 / 24;
	
	By1 = Screen.height * 1.5 / 18;
	By2 = Screen.height * 7 / 18;
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
	
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), MTex, ScaleMode.StretchToFill, false);
	if(GUI.Button(Rect(Bx1, By1, Bw, Bh), "Level 1"+sc[0]))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("Level2Load", 1);
		Application.LoadLevel(PlayerPrefs.GetInt("Level2Load"));
		//Destroy(gameObject);
		}
	if(GUI.Button(Rect(Bx2, By1, Bw, Bh), "Level 2"+sc[1]))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("Level2Load", 2);
		Application.LoadLevel(PlayerPrefs.GetInt("Level2Load"));
		//Destroy(gameObject);
		}
	if(GUI.Button(Rect(Bx3, By1, Bw, Bh), "Level 3"+sc[2]))
		{
		juke.Play(clipnames[0]);
		PlayerPrefs.SetInt("Level2Load", 3);
		Application.LoadLevel(PlayerPrefs.GetInt("Level2Load"));
		//Destroy(gameObject);
		}
	
	/*if(GUI.Button(Rect(Bx4, By1, Bw, Bh), "Level 4"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx1, By2, Bw, Bh), "Level 5"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx2, By2, Bw, Bh), "Level 6"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx3, By2, Bw, Bh), "Level 7"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx4, By2, Bw, Bh), "Level 8"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx1, By3, Bw, Bh), "Level 9"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx2, By3, Bw, Bh), "Level 10"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx3, By3, Bw, Bh), "Level 11"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}
	if(GUI.Button(Rect(Bx4, By3, Bw, Bh), "Level 12"))
		{
		//GameObject.Instantiate(LevelMenu, transform.position, transform.rotation);
		}*/
		
	if(GUI.Button(Rect(0, By4, Bw1, By4), "<<"))
		{
		juke.Play(clipnames[0]);
		GameObject.Instantiate(MenuPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
		}
	}