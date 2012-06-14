private var juke : JukeboxController = new JukeboxController();

function Awake ()
	{
	
	}

/*function Update () {
}*/

function Add (name, clip)
	{
	juke.AddClip(name, clip);
	}
function Play (name)
	{
	if(PlayerPrefs.GetString("Sound") == "Off")
		return;
	juke.PlayClip(name);
	}