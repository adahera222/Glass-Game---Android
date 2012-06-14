var brokenVase : Transform;

var radius = 2.0;           // The radius of the explosion that makes the vase shatter instead of just falling apart

var power = 5.0;           // The power of the explosion (later on this will be multiplied by the velocity,

                            // so the vase shatters more if it falls farther)

var fragility = 12;         // This is for the relative velocity when the vase hits...

                            // bigger numbers for fragility make the vase harder to break
                            
var glassBreakClip: AudioClip;

private var numberOfCollisions = 1; // A count for the number of objects a vase hits at once...

                                    // we only want 1 or else you might get multiple shattered vases at once

 

// We want relative velocity info; otherwise this could be written as "function OnCollisionEnter(collision) {"

// and it would be a bit faster

function Awake ()
	{
	
	}

function OnCollisionEnter(collision : Collision) {

 

    // If the vase isn't going fast enough to break or a collision has already been processed, then don't do anything

    if (collision.relativeVelocity.magnitude < fragility || numberOfCollisions != 1) {return;} 

    else {

        // Get rid of the vase and substitute the broken vase in its place,

        // and increment numberOfCollisions to make sure we only do this stuff once
		
        Destroy (gameObject);

        var clonedVase : Transform = Instantiate(brokenVase, transform.position, transform.rotation);
        
        if(PlayerPrefs.GetString("Sound") == "On")
        	{
        	clonedVase.gameObject.AddComponent(AudioSource);
        	clonedVase.audio.clip = glassBreakClip;
        	clonedVase.audio.playOnAwake = true;
        	}
        if(PlayerPrefs.GetString("Vibration") == "On")
			{
			iPhoneUtils.Vibrate();
			}

        numberOfCollisions ++;

        

        // Get the velocity from the vase and apply it to the pieces of the broken vase

        // I figure the velocity would be reduced some by the impact if the vase was really shattering and not faked,

        // so multiply by .6...looks more or less right anyway, leaving it at 1 doesn't really

        var vaseVelocity = rigidbody.velocity;

        for (var child : Transform in clonedVase) {

            child.rigidbody.velocity = vaseVelocity*.6;

        }

       

        // Do the explosion force thing on nearby objects--the vase shards--in an attempt to simulate a properly breaking vase

        var explosionPos = transform.position;

        var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);

                

        for (var hit in colliders) {

            if (!hit)

                continue;

                

            if (hit.rigidbody) {

                hit.rigidbody.AddExplosionForce(power*collision.relativeVelocity.magnitude, explosionPos, radius, 2.0);

            }

        }

    }

}