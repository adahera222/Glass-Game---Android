  /*
    Sound Manager Scripty by Tom Vogt <tom@lemuria.org>
    
    attach to a gameobject that has two children (Source1 and Source2) which have audio source components
    the audio clips used as soundtracks should have "3D sound" DISABLED
    call "Interrupt()" to fade in event-driven music (see MusicTrigger.js for an example)
  */

var SoundTracks : AudioClip[];
var FadeLength : float = 2.0;

public var Source1 : GameObject;
public var Source2 : GameObject;
public var CurrentSourceActive : int = 1;
private var CurrentTrack : int = 0;
private var SoundRunning : boolean = true;
private var Interrupted : boolean = false;

function Start() {
    if (SoundTracks.length==0) return;
    /*if (PlayerPrefs.GetString("Sound") == "Off")
    	return*/;
    Source1.audio.volume = 1.0;
    Source2.audio.volume = 0.0;
	
	if (PlayerPrefs.GetString("Sound") == "Off")
		{
		Source1.audio.volume = 0;
		}
	
    Source1.audio.PlayOneShot(SoundTracks[0]);
    yield WaitForSeconds(SoundTracks[0].length - FadeLength);
    Fadeover();
}

function Fadeover() {
    while (SoundRunning) {
        CurrentTrack++;
        if (CurrentTrack>=SoundTracks.length) CurrentTrack=0;
        Debug.Log("next track: "+CurrentTrack);
		if(PlayerPrefs.GetString("Sound") == "Off")
			{
			continue;
			}
		else
			{
			if(CurrentSourceActive == 1)
				{
				Source1.audio.volume = 1;
				Source2.audio.volume = 0;
				}
			else
				{
				Source1.audio.volume = 0;
				Source2.audio.volume = 1;
				}
			}
        if (CurrentSourceActive==1) {
            Debug.Log("switching to source 2");
            Source2.audio.PlayOneShot(SoundTracks[CurrentTrack]);
            CurrentSourceActive=2;
            FadeUpDown(Source2.audio, Source1.audio, FadeLength);
        } else {
            Debug.Log("switching to source 1");
            Source1.audio.PlayOneShot(SoundTracks[CurrentTrack]);
            CurrentSourceActive=1;
            FadeUpDown(Source1.audio, Source2.audio, FadeLength);
        }
        Debug.Log("waiting for end...");
        yield WaitForSeconds(SoundTracks[CurrentTrack].length - FadeLength);
    }
}

function Interrupt(with:AudioClip) {
    Debug.Log("interrupting");
    if (Interrupted) return;
    Interrupted = true;
    if (CurrentSourceActive==1) {
        Source2.audio.PlayOneShot(with);
        FadeUpDown(Source2.audio, Source1.audio, 1.0);
    } else {
        Source1.audio.PlayOneShot(with);
        FadeUpDown(Source1.audio, Source2.audio, 1.0);
    }
    yield WaitForSeconds(1.0);
    var waitfor = with.length-2.0;
    if (CurrentSourceActive==1) {
        Source1.audio.Pause();
        if (waitfor>0)  yield WaitForSeconds(waitfor);
        EndInterrupt();
    } else {
        Source2.audio.Pause();
        if (waitfor>0)  yield WaitForSeconds(waitfor);
        EndInterrupt();
    }
}

function EndInterrupt() {
    if (!Interrupted) return;
    Interrupted = false;
    if (CurrentSourceActive==1) {
        Source1.audio.Play();
        FadeUpDown(Source1.audio, Source2.audio, 1.0);
        yield WaitForSeconds(1.0);
        Source2.audio.Stop();
    } else {
        Source2.audio.Play();
        FadeUpDown(Source2.audio, Source1.audio, 1.0);
        yield WaitForSeconds(1.0);
        Source1.audio.Stop();
    }
}

function FadeUpDown(up:AudioSource, down:AudioSource, duration:float) {
    var MyVolume = 0.0;
    while (MyVolume<1.0) {
        MyVolume += Time.deltaTime / duration;
        up.volume = MyVolume;
        down.volume = 1.0-MyVolume;
        yield WaitForFixedUpdate();
    }
    up.volume = 1.0;
    down.volume = 0.0;
}