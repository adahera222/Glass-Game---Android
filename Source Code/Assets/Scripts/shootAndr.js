var TinArrangement : Transform;
var WinDist : float = 0;
var TotalNoTins : int = 15;
private var CurScure : int = 0;

var ballCountTexture : Texture;
var activeCol : Color;
var hoverCol : Color;
var normalCol : Color;
var LabelCol : Color;
var backgroundColor : Color;
var font : Font;

var lspeed : float = 2;
var hspeed : float = 9;

private var Speed : float;
var ballSpawnPos : Transform;
var ballPrefab: GameObject;
var ballno = 3;

var camParent : Transform;
var camLimit : Transform;
var smf : SmoothFollow;
var camMotion : L2TabBehav;

var MoveMntMargin : float = 20;
private var hposl : float;
private var hposh : float;

var HDegree : float = 1;
var VDegree : float = 1;

var SpeedFactor : float = 0.25;

var jukeboxName : String;
private var juke : JukeBox;
var clips : AudioClip[];
var clipnames : String[];

private var chslv : float;
private var cvslv : float;

private var flag = false;
private var flagthrow = false;

private var tbflag = false;
private var bpos : Vector2;

private var hslx : int;
private var hsly : int;
private var hslw : int;
private var hslh : int;

private var vslx : int;
private var vsly : int;
private var vslw : int;
private var vslh : int;

private var tmxl : float = 0;
private var tmxh : float = 0;
private var tmyl : float = 0;
private var tmyh : float = 0;

private var flagWin = false;
private var flagGO = false;
private var pauseflag = false;
private var flag1 = true;

//private var camflag = false;



private var tins : GameObject[];
private var ball : GameObject;
private var SUIToggle = false;
private var Bstr : String = "<<";
private var hsflg = false;
//private var rz : float = 0;

function Awake () {
	juke = GameObject.Find(jukeboxName).GetComponent(JukeBox);
	 for(var i = 0; i < clips.Length; i++)
	 	{
	 	//juke.AddClip(clipnames[i], clips[i]);
	 	juke.Add(clipnames[i], clips[i]);
	 	}
	if(!PlayerPrefs.HasKey("HighScore"+Application.loadedLevel))
		{
		PlayerPrefs.SetInt("HighScore"+Application.loadedLevel, 0);
		}
	
	//GameObject.Find("ball count text").guiText.text = "" + ballno;
	//tins = GameObject.FindGameObjectsWithTag("tin");
	ballno = PlayerPrefs.GetInt("NumOfBalls");
	hslx = Screen.width * 5 / 24;
	hslw = Screen.width / 2;
	hsly = Screen.height * 15 / 18;
	hslh = Screen.height / 9;
	
	vslx = Screen.width / 24;
	vslw = Screen.width / 12;
	vsly = Screen.height * 4 / 18;
	vslh = Screen.height * 7 / 18;
	
	hposl = transform.position.x - MoveMntMargin/2;
	hposh = transform.position.x + MoveMntMargin/2;
	Speed = lspeed;
	tmxl = Mathf.Floor(Screen.width * 2.5 / 16);
	tmxh = Mathf.Floor(Screen.width * 13 / 16);
	tmyl = Mathf.Floor(Screen.height / 8);
	tmyh = Mathf.Floor(Screen.height * 13 / 16);
	
	
	
}
function Update () {
	if(!ball)
		{
		ball= Instantiate(ballPrefab,ballSpawnPos.position,transform.rotation);
		transform.position = camParent.position;
		transform.rotation = camParent.rotation;
		if(camMotion)
			camMotion.enabledflag = true;
		ball.rigidbody.isKinematic = true;
		}
	if(!ball.rigidbody.isKinematic)
		{flag1 = false;
		if(ball.rigidbody.velocity.magnitude < 0.8)
			Destroy(ball);
		if(transform.position.z >= camLimit.position.z)
			{
			smf.enabledflag = false;
			
			//GetComponent("SmoothFollow").enabledflag = false;
			}
		//print(flag1);
		}
	else
		{flag1 = true;}
	
	if(Input.touchCount > 0 && 
      Input.GetTouch(0).phase == TouchPhase.Moved)
		{
		if((Input.GetTouch(0).position.x > tmxl && Input.GetTouch(0).position.x <tmxh) && (Input.GetTouch(0).position.y > tmyl && Input.GetTouch(0).position.y <tmyh))
			{
			transform.Rotate(-(Input.GetTouch(0).deltaPosition.y) * VDegree, 0, 0);
			camParent.Rotate(0, (Input.GetTouch(0).deltaPosition.x) * HDegree, 0);
			}
		}
	if((!flag && flagthrow) && flag1)
	{
	if(ballno > 0)
		{
		ballno--;
		
		//GameObject.Find("ball count text").guiText.text = "" + ballno;
		//var ball= Instantiate(ballPrefab,transform.position,transform.rotation);
		//flag = false;
		flag1 = false;
		flagthrow = false;
		ball.rigidbody.isKinematic = false;
		ball.transform.position = transform.position;
		ball.transform.rotation = transform.rotation;
		ball.rigidbody.AddForce(transform.forward * 500 * Speed);
		Speed = lspeed;
		
		ball.tag = "ball";
		smf.target = ball.transform;
		smf.enabledflag = true;
		if(camMotion)
			camMotion.enabledflag = false;
		//GetComponent("SmoothFollow").enabledflag = true;
		}
	//GameObject.Find("GameObject").audio.Play();
	}
	if(flag1)
		{
		var mot = CheckMotion ();
		CalcScore(PlayerPrefs.GetInt("NumOfBalls") - ballno);
		if(CheckWin() )
			{
			if(!flagWin){
				CurScure += 1200 / PlayerPrefs.GetInt("NumOfBalls") * ballno;
				if(CurScure >= PlayerPrefs.GetInt("HighScore"+Application.loadedLevel))
					{
					PlayerPrefs.SetInt("HighScore"+Application.loadedLevel, CurScure);
					hsflg = true;}
				}
			flagWin = true;
			}
		else if(ballno == 0 && mot)
			{flagGO = true;}
		flag1 = false;	//flagidl = false;
		}
		
		/*if(flag && flagthrow)
			{
			Speed += SpeedFactor;
			if(Speed >= hspeed)
				Speed = hspeed;
			}*/
	
}

function CalcScore (temp)
	{
	//var juk : JukeboxController;
	
	
	var scfac : int;
	var cnt : int = TotalNoTins;
	switch(temp){
		case 1:
			scfac = 100;
			break;
		case 2:
			scfac = 75;
			break;
		case 3:
			scfac = 50;
			break;
		case 4:
			scfac = 25;
			break;
		}
	for(var i : Transform in TinArrangement)
		if(i.position.y > WinDist)
			cnt --;
	CurScure += cnt * scfac;
	TotalNoTins -= cnt;
	}

function CheckWin ()
	{
	
	var ans = true;
	for(var i : Transform in TinArrangement)
		{
		if(i.position.y > WinDist)
			{
			ans = false;
			return false;
			}
		}
		return ans;
	}
function CheckMotion ()
	{
	
	var ans = 0;
	
	//var ans = true;
	for(var i : Transform in TinArrangement)
		{
		/*if(tins[i].GetComponent(Rigidbody).velocity.magnitude != 0)
			{
			ans = false;
			return false;
			}*/
			
			ans += i.rigidbody.velocity.magnitude;
		}
		
		if(ans == 0)
			return true;
		else	return false;
		//return ans;
	}

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
	
	/*if(GUI.Button(Rect(Screen.width * 22.5 / 24, Screen.height * 7 / 18, Screen.width * 1.5 / 24, Screen.height * 4 / 18), Bstr))
		{
		SUIToggle = !SUIToggle;
		if(Bstr == ">>")
			Bstr = "<<";
		else
			Bstr = ">>";
		}
	
	if(SUIToggle)
		{
		if(GUI.Button(Rect(Screen.width * 14 / 24, Screen.height / 18, Screen.width * 3.5 / 24, Screen.height * 3.5 / 18), ">>>"))
			{
			if(Application.loadedLevel < Application.levelCount - 1)
				Application.LoadLevel(Application.loadedLevel + 1);
			}
		if(GUI.Button(Rect(Screen.width * 18.5 / 24, Screen.height / 18, Screen.width * 3.5 / 24, Screen.height * 3.5 / 18), "<<<"))
			{
			if(Application.loadedLevel > 1)
				Application.LoadLevel(Application.loadedLevel - 1);
			}
		if(GUI.Button(Rect(Screen.width * 15 / 24, Screen.height / 3, Screen.width / 4, Screen.height / 6), "Main Menu"))
			{
			Application.LoadLevel(0);
			}
		if(GUI.Button(Rect(Screen.width * 2 / 3, Screen.height * 5 / 9, Screen.width / 6, Screen.height / 6), "Exit"))
			{
			Application.Quit();
			}
		}*/
	//else{
		GUI.DrawTexture(Rect(Screen.width * 19 / 24, Screen.height / 18, Screen.width / 6, Screen.height / 9), ballCountTexture, ScaleMode.ScaleToFit, true);
	
		GUI.Label(Rect(Screen.width * 21 / 24, Screen.height * 1.5 / 18, Screen.width / 12, Screen.height / 18), "" + ballno);
		if(GUI.RepeatButton(Rect(Screen.width * 19 / 24, Screen.height * 13 / 18, Screen.width / 6, Screen.height / 4.5),"Throw"))
			{
			flag = true;
			flagthrow = true;
			Speed += SpeedFactor;
			if(Speed >= hspeed)
				Speed = hspeed;
			}
		else
			flag = false;
	
		//GUI.Label(Rect(Screen.width - 50,0,50,50),Time.frameCount/Time.time + "");
		transform.position.x = GUI.HorizontalSlider(Rect(hslx,hsly,hslw,hslh), transform.position.x, hposl, hposh);
		Speed = GUI.VerticalSlider (Rect (vslx,vsly,vslw,vslh), Speed, hspeed, lspeed);
//		}
	if(GUI.Button(Rect(Screen.width / 24, Screen.height / 18, Screen.width / 6, Screen.height / 9), "Pause"))
	{
	juke.Play(clipnames[0]);
	pauseflag = !pauseflag;
	}
	if(pauseflag)
	{
	
	GUI.Box(Rect(Screen.width / 12, Screen.height / 6, Screen.width * 5 / 6, Screen.height * 5 / 9),"Game Paused");
	GUI.Label(Rect(Screen.width * 3.5 / 24, Screen.height / 4, Screen.width * 17 / 24, Screen.height * 5 / 18), "To Play Again Press \"Reset\".");
	
	if(GUI.Button(Rect(Screen.width * 3.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5.5 / 24, Screen.height / 9), "Resume"))
		{
			juke.Play(clipnames[0]);
			pauseflag = false;
		}
	if(GUI.Button(Rect(Screen.width * 15.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5.5 / 24, Screen.height / 9), "Menu"))
		{
			juke.Play(clipnames[0]);
			Application.LoadLevel (0);
		}
	if(GUI.Button(Rect(Screen.width * 9.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5.5 / 24, Screen.height / 9), "Restart"))
		{
			juke.Play(clipnames[0]);
			Application.LoadLevel (Application.loadedLevel);
		}
	}
	
	if(flagWin)
	{
	
	GUI.Box(Rect(Screen.width / 12, Screen.height / 6, Screen.width * 5 / 6, Screen.height * 5 / 9),"You Win");
	if(!hsflg)
		GUI.Label(Rect(Screen.width * 3.5 / 24, Screen.height / 4, Screen.width * 17 / 24, Screen.height * 5 / 18), "You Cleared The Level.\nYour Score: " + CurScure + ".\nHigh Score: " + PlayerPrefs.GetInt("HighScore"+Application.loadedLevel));
	else
		GUI.Label(Rect(Screen.width * 3.5 / 24, Screen.height / 4, Screen.width * 17 / 24, Screen.height * 5 / 18), "You Cleared The Level. \nNew High Score: " + CurScure + ".");
	if(GUI.Button(Rect(Screen.width * 3.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "Next Level"))
		{
			juke.Play(clipnames[0]);
			var nxtlvl : int = Application.loadedLevel + 1;
			if(nxtlvl == Application.levelCount)
				{
				Application.LoadLevel (0);
				}
			else
				Application.LoadLevel (nxtlvl);
		}
	if(GUI.Button(Rect(Screen.width * 15.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "Menu"))
		{
			juke.Play(clipnames[0]);
			Application.LoadLevel (0);
		}
	/*if(GUI.Button(Rect(Screen.width * 9.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "Score"))
		{
			
		}*/
			
	}
	if(flagGO)
	{
	
	GUI.Box(Rect(Screen.width / 12, Screen.height / 6, Screen.width * 5 / 6, Screen.height * 5 / 9),"Game Over");
	GUI.Label(Rect(Screen.width * 3.5 / 24, Screen.height / 4, Screen.width * 17 / 24, Screen.height * 5 / 18), "To Play Again Press \"Reset\".");
	
	if(GUI.Button(Rect(Screen.width * 3.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "Reset"))
		{
			juke.Play(clipnames[0]);
			Application.LoadLevel (Application.loadedLevel);
		}
	if(GUI.Button(Rect(Screen.width * 15.5 / 24, Screen.height * 10.5 / 18, Screen.width * 5 / 24, Screen.height / 9), "Main Menu"))
		{
			juke.Play(clipnames[0]);
			Application.LoadLevel (0);
		}
	}
	
}