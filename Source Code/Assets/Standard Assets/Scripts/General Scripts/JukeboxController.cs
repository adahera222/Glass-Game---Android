using UnityEngine;
using System.Collections;

/*
    Usage:
    JukeboxController jukebox = new JukeboxController();
    jukebox.AddClip("mysong", myclip);
    jukebox.PlayClip("mysong");
    jukebox.StopClip();
*/
public class JukeboxController : MonoBehaviour{

    Hashtable jukebox;
    string current_clip;

    public JukeboxController()
    {
        jukebox = new Hashtable();
        current_clip = null;
    } // constructor

    public void AddClip(string name, AudioClip clip)
    {
        if (jukebox == null)
        {
            jukebox = new Hashtable();
        } // if
		
        GameObject obj;
		if(jukebox.ContainsKey(name))
			return;
        obj = new GameObject();
        obj.AddComponent("AudioSource");
		obj.audio.playOnAwake = false;
        obj.audio.clip = clip;
        obj.audio.ignoreListenerVolume = true;
        //DontDestroyOnLoad(obj);
        jukebox.Add(name, obj);
    } // AddClip()

    /*
        Play a named audio clip.
        Does not restart the clip if it is played twice in a row.
        Will stop a previously playing clip to play this new clip.
    */
    public void PlayClip(string name)
    {
        /*if (name == current_clip)
        {
            return;
        } */ // if
        if (current_clip != null)
        {
            StopClip();
        } // if
        
        ((GameObject)jukebox[name]).audio.Play();
        current_clip = name;
    } // PlayClip()
    
    public void StopClip()
    {
        ((GameObject)jukebox[current_clip]).audio.Stop();
    } // StopClip()

}