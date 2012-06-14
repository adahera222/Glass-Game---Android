var bounceClip : AudioClip;

function Awake()
	{
	audio.clip = bounceClip;
	audio.playOnAwake = false;
	}
function OnCollisionEnter(CollInfo : Collision)
	{
	if(PlayerPrefs.GetString("Sound") == "On")
		audio.Play();
	}