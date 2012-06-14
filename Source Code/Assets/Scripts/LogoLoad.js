var theTexture : Texture2D;
var MenuPrefab : Transform;
private var StartTime : float;

function OnLevelWasLoaded(){
StartTime = Time.time;
}

function Update () {
	if(Time.time-StartTime >= 2){
	GameObject.Instantiate(MenuPrefab, transform.position, transform.rotation);
	Destroy(gameObject);
	}
}

function OnGUI(){

	GUI.color = Color.white;
	//if()
		//GUI.color.a = Mathf.Lerp(0.0, 1.0, (Time.time-StartTime)/3);
	GUI.color.a = Mathf.Lerp(1, 0.0, (Time.time-StartTime)/2);
	
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), theTexture);
}