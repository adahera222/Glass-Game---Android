var clips : AudioClip[];

function Awake ()
	{
	audio.playOnAwake = false;
	}

function OnCollisionEnter(CollisionInfo : Collision)
	{
	if(PlayerPrefs.GetString("Sound") == "Off")
		return;
	if(CollisionInfo.gameObject.tag == "ball")
		{
		audio.clip = clips[0];
		audio.Play();
		}
	else
		{
		audio.clip = clips[1];
		audio.Play();
		}
	if(PlayerPrefs.GetString("Vibration") == "Off")
		return;
	iPhoneUtils.Vibrate();
	}
/*function Update () {
}*/